import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logout();
    window.location.href = "/";
  };

  return (
    <Button
      variant="danger"
      className="ml-auto"
      title="Sign Out"
      onClick={handleLogout}
    >
      Sign Out
    </Button>
  );
};