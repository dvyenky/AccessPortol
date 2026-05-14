import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Requests",
      icon: <AssignmentIcon />,
      path: "/requests",
    },
    {
      text: "Analytics",
      icon: <AnalyticsIcon />,
      path: "/analytics",
    },
  ];

  return (
    <Box
      sx={{
        width: 260,
        backgroundColor: "#111827",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Access Portal
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#374151" }} />

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: 2,

              "&.Mui-selected": {
                backgroundColor: "#2563eb",
              },

              "&:hover": {
                backgroundColor: "#1f2937",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;