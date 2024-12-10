"use client";

import { removeSession } from "../(login)/actions";
import { Button } from "../components";
import { useUser } from "../context/AuthContext";

export const Dashboard = () => {
  const { user } = useUser();

  const handleLogout = () => {
    removeSession();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="text-lg font-semibold text-gray-800">
        Hi, <span className="text-blue-600">{user?.email}</span>
      </div>
      <Button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      >
        Logout
      </Button>
    </div>
  );
};
