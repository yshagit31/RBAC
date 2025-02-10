import React, { useEffect, useState } from "react";
import { useNotification } from "@refinedev/core";
import axios from "axios";
import { OpenNotificationParams } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const navigate = useNavigate(); 
  const { open } = useNotification();

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/users/${id}`);

      if (response.status >= 400) {
        open?.({
          type: "error",
          message: response.data.message,
        });
        return;
      }

      open?.({
        type: "success",
        message: response.data.message || "User deleted successfully",
      });

      navigate("/users");
    } catch (error: any) {
      open?.({
        type: "error",
        message: error.response?.data?.message || "Error deleting user",
      });
    }
  };

  return { handleDeleteUser};
};
