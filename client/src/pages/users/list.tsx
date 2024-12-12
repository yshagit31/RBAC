import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, ShowButton, List, useDataGrid } from "@refinedev/mui";
import { MenuItem, Select, FormControl, Fab } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";

interface UserListProps {
  role: string;
}

type IUser = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
};

export const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { data: currentuser } = useGetIdentity<IUser>();
  const [loading, setLoading] = useState(true);
  const [role,setRole]=useState("");
  // const [IsAdmin,setIsAdmin]=useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users");
        // console.log(response.data);
        const usersWithSno = response.data.map((user:IUser , index :number) => ({
          ...user,
          sno: index + 1,
        }));
        setUsers(usersWithSno);
        // console.log(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const IsAdmin = currentuser?.role === "ADMIN";

  const { dataGridProps } = useDataGrid({});
  const columns = React.useMemo<GridColDef[]>(() => [
    {
      field: "sno",
      headerName: "S. No.",
      type: "number",
      minWidth: 50,
    },
    {
      field: "name",
      flex: 1,
      headerName: "Name",
      minWidth: 200,
    },
    {
      field: "email",
      flex: 1,
      headerName: "Email",
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (IsAdmin) {
          return (
            <FormControl fullWidth>
              <Select
                value={params.row.role}
                onChange={(e) => handleRoleChange(e, params.row._id)}
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="MODERATOR">Moderator</MenuItem>
                <MenuItem value="CLIENT">Client</MenuItem>
              </Select>
            </FormControl>
          );
        }
        return params.row.role;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: ({ row }) => (
        <>
          {IsAdmin && <EditButton hideText recordItemId={row._id}/>} 
          <ShowButton hideText recordItemId={row._id} />
         {IsAdmin && <DeleteButton hideText recordItemId={row._id} />} 
        </>
      ),
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
  ], [currentuser]);

  const handleRoleChange = async (event:React.ChangeEvent<HTMLSelectElement>, userId: string) => {
    const newRole = event.target.value;
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/users/${userId}`,
        { role: newRole }
      );
  
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((curr) =>
            curr._id === userId ? { ...curr, role: newRole } : curr
          )
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        rows={users}
        columns={columns}
        autoHeight
        loading={loading}
        getRowId={(row) => row._id}
      />
    </List>
  );
};
