import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { useGetIdentity, useDelete } from "@refinedev/core";


type IUser = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
};


export const UserShow = () => {
  const { queryResult } = useShow({});
  // console.log("query result",queryResult);
  const { data, isLoading } = queryResult;
  const { data: currentuser } = useGetIdentity<IUser>();
  const IsAdmin = currentuser?.role === "ADMIN";

  const record = data?.data;

  // console.log("record",record?._id);
  // console.log("current user",currentuser?._id);
  const canEdit = record?._id === currentuser?._id || IsAdmin;


  return (
    <Show isLoading={isLoading} {... (!canEdit  ? {canDelete : false, canEdit : false} : {}) }   >
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?._id} />
        <Typography variant="body1" fontWeight="bold">
          {"Name"}
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          {"Email"}
        </Typography>
        <TextField value={record?.email} />
        <Typography variant="body1" fontWeight="bold">
          {"Role"}
        </Typography>
        <TextField value={record?.role} />
      </Stack>
    </Show>
  );
};
