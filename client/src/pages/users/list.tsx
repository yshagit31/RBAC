import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, ShowButton, List, useDataGrid } from "@refinedev/mui";
import {MenuItem, Select, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography  } from "@mui/material";
import { useGetIdentity, useDelete } from "@refinedev/core";
import { useNotification } from "@refinedev/core";
import { SelectChangeEvent } from "@mui/material";

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
  const { open } = useNotification();
  const { mutate } = useDelete();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
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
  const IsClient = currentuser?.role === "CLIENT";

  const handleOpenDeleteDialog = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      mutate(
        {
          resource: "users",
          id: selectedUserId,
        },
        {
          onSuccess: () => {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUserId));
            setOpenDialog(false);
          },
        }
      );
    }
  };

  const { dataGridProps } = useDataGrid({});
  const columns = React.useMemo<GridColDef[]>(() => {
    const baseColumns: GridColDef[] = [
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
    ];
  
    if (!IsClient) {
      baseColumns.push({
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: ({ row }) => (
          <>
            {IsAdmin && <EditButton hideText recordItemId={row._id} />}
            <ShowButton hideText recordItemId={row._id} />
            {IsAdmin && (
              <DeleteButton
                hideText
                recordItemId={row._id}
                onClick={() => handleOpenDeleteDialog(row._id)
                }
              />
            )}
          </>
        ),
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      });
    }
  
    return baseColumns;
  }, [currentuser]);
  
  // console.log("IS admin",IsAdmin);
  // const handleRoleChange = async (event:React.ChangeEvent<HTMLSelectElement>, userId: string) => {
  //   const newRole = event.target.value;
  //   if (!userId) {
  //     console.error("Invalid user ID");
  //     return;
  //   }

  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:8000/api/v1/users/${userId}`,
  //       { role: newRole }
  //     );
  
  //     if (response.status === 200) {
  //       setUsers((prevUsers) =>
  //         prevUsers.map((curr) =>
  //           curr._id === userId ? { ...curr, role: newRole } : curr
  //         )
  //       );
  //       open?.({
  //         type: "success",
  //         message: response.data.message || "User Updated successfully",
  //       });

  //     }
  //   } catch (error) {
  //     console.error("Error updating user role:", error);
  //     open?.({
  //       type: "error",
  //       message: error.response?.data?.message || "Error Updating user",
  //     });
  //   }
  // };


  const handleRoleChange = async (event: SelectChangeEvent<any>, userId: string) => {
    const newRole = event.target.value;

    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/users/${userId}`, { role: newRole });

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((curr) => (curr._id === userId ? { ...curr, role: newRole } : curr))
        );

        open?.({
          type: "success",
          message: response.data.message || "User Updated successfully",
        });
      }
    } catch (error: any) {
      console.error("Error updating user role:", error);
      open?.({
        type: "error",
        message: error.response?.data?.message || "Error Updating user",
      });
    }
  };

  return (
  <List headerButtons={IsClient ? [] : undefined}>
      <DataGrid
        rows={users}
        columns={columns}
        autoHeight
        loading={loading}
        getRowId={(row) => row._id}
        sortingMode="client"
        disableColumnMenu={false} 
      />

    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Typography variant="h6">Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};
