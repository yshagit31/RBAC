import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm, useController } from "react-hook-form";
import { useParams } from "react-router-dom";

type IUser = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
};

export const UserEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

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
        // Optionally, show a success message or navigate away
        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Edit saveButtonProps={{ onClick: handleSubmit(onSubmit) }}>
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
    </Edit>
  );
};
