import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export const UserEdit = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
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
            {...register("role", { required: "This field is required" })}
            error={!!(errors as any)?.role}
            label="Role"
            name="role"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="MODERATOR">Moderator</MenuItem>
            <MenuItem value="CLIENT">Client</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Edit>
  );
};
