import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
