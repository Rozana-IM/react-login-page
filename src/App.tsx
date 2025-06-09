import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";
import './index.css';

const App: React.FC = () => {
  return (
    <>
      <div className="bg-green-500 text-white p-4 text-center">
      </div>

       <Routes key={location.pathname}>

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-list" element={<UserListPage />} />
      </Routes>
    </>
  );
};

export default App;
