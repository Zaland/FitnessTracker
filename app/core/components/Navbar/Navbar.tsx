import { useState, ReactNode } from "react"
import {
  Box,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
} from "@mui/material"
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"
import { Routes, useMutation, useRouter } from "blitz"
import { AppBar } from "./AppBar"
import { Drawer, DrawerHeader } from "./Drawer"
import logout from "app/auth/mutations/logout"

export const Navbar = ({ children }: { children?: ReactNode }) => {
  const [open, setOpen] = useState(true)
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    await logoutMutation()
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap component="div" sx={{ fontWeight: 600, fontSize: 18 }}>
            FitnessTracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} width={240}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton key="home" onClick={() => router.push(Routes.HomePage())}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="home" />
          </ListItemButton>
          <ListItemButton key="profile" onClick={() => router.push(Routes.ProfilePage())}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="profile" />
          </ListItemButton>
          <Divider />
          <ListItemButton key="logout" onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="logout" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
