import React from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div
      className={`alert ${
        type === "success" ? "alert-success" : "alert-danger"
      } mt-3`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Notification;
