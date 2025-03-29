import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, requireAdmin = false }) => {
  if (!user) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra vai trò admin (giả sử bạn lưu vai trò trong user metadata hoặc Firestore)
  if (requireAdmin) {
    const isAdmin = user.role === "admin"; // Thay bằng logic thực tế để kiểm tra vai trò
    if (!isAdmin) {
      return <Navigate to="/" replace />; // Chuyển hướng về trang chủ nếu không phải admin
    }
  }

  return children;
};

export default ProtectedRoute;