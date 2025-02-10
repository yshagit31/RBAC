import { Box, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@mui/material";

export const UserCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    watch,
    formState: { errors },
  } = useForm({});

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >

    <TextField
      {...register("email", {
        required: "This field is required",
      })}
      error={!!(errors as any)?.email}
      helperText={(errors as any)?.email?.message}
      margin="normal"
      fullWidth
      InputLabelProps={{ shrink: true }}
      type="email"
      label="Email"
      name="email"
    />

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
      label="Name"
      name="name"
    />

    <FormControl fullWidth margin="normal" error={!!(errors as any)?.role} variant="outlined">
      <InputLabel shrink sx={{ backgroundColor: "white", px: 1 }}>Role</InputLabel>
      <Select
        {...register("role", { required: "This field is required" })}
        defaultValue=""
        name="role"
        sx={{
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#007bff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#007bff",
          },
        }}
      >
        <MenuItem value="moderator">Moderator</MenuItem>
        <MenuItem value="client">Client</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
      <FormHelperText>{(errors as any)?.role?.message}</FormHelperText>
    </FormControl>

    <TextField
      {...register("password", {
        required: "This field is required",
        minLength: { value: 6, message: "Password must be at least 6 characters" },
      })}
      error={!!(errors as any)?.password}
      helperText={(errors as any)?.password?.message}
      margin="normal"
      fullWidth
      InputLabelProps={{ shrink: true }}
      type="password"
      label="Password"
      name="password"
    />

    <TextField
      {...register("confirmPassword", {
        required: "This field is required",
        validate: (value) =>
          value === watch("password") || "Passwords do not match",
      })}
      error={!!(errors as any)?.confirmPassword}
      helperText={(errors as any)?.confirmPassword?.message}
      margin="normal"
      fullWidth
      InputLabelProps={{ shrink: true }}
      type="password"
      label="Confirm Password"
      name="confirmPassword"
    />

      </Box>
    </Create>
  );
};
