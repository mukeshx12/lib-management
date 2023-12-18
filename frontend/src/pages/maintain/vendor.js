import { useRouter } from "next/router";
import React from "react";
import axios from "axios";

const AdminWelcomePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/admin/logout");
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <div className="bg-blue-300 h-screen">
      <div className="flex bg-blue-300">
        <h2
          className="flex-1 text-left p-4 bg-gray-200 text-xl cursor-pointer"
          onClick={handleLogout}
        >
          Home
        </h2>
        <h2
          className="flex-1 text-right p-4 bg-gray-200 text-xl cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </h2>
      </div>
      <div className="bg-blue-300">
        <div className="flex">
            <h1 className="text-2xl h-16 mr-24 p-2 border-2 border-gray-100 bg-gray-200 rounded m-8">Membership</h1>
            <div>
                <p className="text-xl p-2 border-2 border-gray-100 bg-gray-200 rounded m-8">Add</p>
                <p className="text-xl p-2 border-2 border-gray-100 bg-gray-200 rounded m-8">Update</p>
            </div>
        </div>
        <div className="flex">
            <h1 className="text-2xl h-16 p-2 border-2 border-gray-100 bg-gray-200 rounded m-8">User Management</h1>
            <div>
                <p className="text-xl p-2 border-2 border-gray-100 bg-gray-200 rounded m-8">Add</p>
                <p className="text-xl p-2 border-2 border-gray-100 bg-gray-200 rounded m-8">Update</p>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminWelcomePage;
