import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button sx={{color: 'white', marginX: '2px'}} onClick={handleLogout}>
      Log Out
    </Button>
  );
};