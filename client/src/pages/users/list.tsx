import React, { useEffect, useState } from "react";
import axios from "axios"; // To make API requests
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DeleteButton, EditButton, List, ShowButton, useDataGrid } from "@refinedev/mui";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material"; // Material UI components for dropdown

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // To store the current logged-in user
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Assuming you are checking user authentication with a token or session
        const response = await axios.get("http://localhost:8000/api/v1/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    // Fetch current user info (mocked here for demo purposes)
    const fetchCurrentUser = async () => {
      try {
        // Here you would check the logged-in user's role (via an API or token)
        const response = await axios.get("http://localhost:8000/api/v1/user");
        setCurrentUser(response.data); // Assuming response contains user info (name, role, etc.)
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  const { dataGridProps } = useDataGrid({});

  const columns = React.useMemo<GridColDef[]>(() => [
    {
      field: "id",
      headerName: "ID",
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
        // Only show dropdown if the user is an admin
        if (currentUser?.role === "admin") {
          return (
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={params.row.role}
                onChange={(e) => handleRoleChange(e, params.row.id)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
                <MenuItem value="client">Client</MenuItem>
              </Select>
            </FormControl>
          );
        }
        return params.row.role; // Display the role as text if not admin
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: ({ row }) => (
        <>
          <EditButton hideText recordItemId={row.id} />
          <ShowButton hideText recordItemId={row.id} />
          <DeleteButton hideText recordItemId={row.id} />
        </>
      ),
      align: "center",
      headerAlign: "center",
      minWidth: 80,
    },
  ], [currentUser]);

  // Handle role change
  const handleRoleChange = async (event, userId) => {
    const newRole = event.target.value;

    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/users/${userId}`, { role: newRole });
      // Update the users state with the new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
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
        loading={loading} // Show loading state
      />
    </List>
  );
};
