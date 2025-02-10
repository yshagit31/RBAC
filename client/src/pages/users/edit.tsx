import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm, useController } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNotification } from "@refinedev/core";
// import handleDeleteUser from "./delete" 
import { useDeleteUser } from "./delete";
import { useNavigate } from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography  } from "@mui/material";


type IUser = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
};

export const UserEdit = () => {
  const { handleDeleteUser } = useDeleteUser(); 
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const { open } = useNotification();
  const navigate=useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const {
    field: roleField,
    fieldState: { error: roleError },
  } = useController({
    control,
    name: "role",
    rules: { required: "This field is required" },
  });

  const onSubmit = async (data: { name: string; email: string; role: string }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/users/${id}`, // Update user API endpoint
        {
          name: data.name,
          email: data.email,
          role: data.role,
        }
      );

      if (response.status === 200) {
        open?.({
          type: "success",
          message: response.data.message || "User Updated successfully",
        });
        navigate("/users");
      }
    } catch (error:any) {
      console.error("Error updating user:", error);
      open?.({
        type: "error",
        message: error.response?.data?.message || "Error Updating user",
      });
    }
  };

  return (
    <Edit saveButtonProps={{ onClick: handleSubmit(onSubmit) }} 
     deleteButtonProps={{ onClick: () =>  handleOpenDeleteDialog (id!) }}>

      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        {/* Name Field */}
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Name"}
          name="name"
        />

        {/* Email Field */}
        <TextField
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email"
          label={"Email"}
          name="email"
        />

        {/* Role Field */}
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Role</InputLabel>
          <Select
            {...roleField}
            error={!!roleError}
            label="Role"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="MODERATOR">Moderator</MenuItem>
            <MenuItem value="CLIENT">Client</MenuItem>
          </Select>
          {roleError && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {roleError.message}
            </div>
          )}
        </FormControl>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <Typography variant="h6">Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={() =>handleDeleteUser(selectedUserId!)} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Edit>
  );
};
