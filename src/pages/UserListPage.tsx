import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";

interface User {
  id: number;
  name: string;
  email: string;
}

const BATCH_SIZE = 10;

const UserListPage: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_limit=${BATCH_SIZE}&_page=${page}`
      );
      const data: User[] = await res.json();

      setUsers((prev) => [...prev, ...data]);
      if (data.length < BATCH_SIZE) setHasMore(false);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen flex flex-col justify-start">
      <h1 className="text-xl font-bold mb-4 text-center">User List</h1>

      <UserList users={users} />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {!hasMore && <p className="text-center mt-4 text-gray-500">No more users.</p>}

      <button
        onClick={logout}
        className="mt-auto bg-red-500 text-white px-4 py-2 rounded mt-6 self-center"
      >
        Logout
      </button>
    </div>
  );
};

export default UserListPage;
