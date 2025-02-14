import { useState, useEffect } from "react";
import axios from "axios";

interface IUser {
  _id: string;
  name: string;
  email: string;
  lastLogin?: string;
  role?: string;
}

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/users");
      const usersWithSno = response.data.map((user: IUser, index: number) => ({
        ...user,
        sno: index + 1,
      }));
      setUsers(usersWithSno);
      setLoading(false);
    } catch (err) {
      setError("Error fetching users");
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };


    fetchUsers();
    console.log("Users",users);

  return { users, loading, error, fetchUsers };
};

export default useUsers;
