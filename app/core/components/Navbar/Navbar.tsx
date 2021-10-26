import { useState, ReactNode } from "react"
import {
  Box,
  Toolbar,
  List,
  ListItemButton as MuiListItemButton,
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
  FitnessCenter as FitnessCenterIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { Routes, useMutation, useRouter } from "blitz"
import { AppBar } from "./AppBar"
import { Drawer, DrawerHeader } from "./Drawer"
import logout from "app/auth/mutations/logout"

const listItems = [
  { label: "home", icon: <HomeIcon />, route: Routes.HomePage() },
  { label: "profile", icon: <PersonIcon />, route: Routes.ProfilePage() },
]

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  textTransform: "capitalize",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    ".listIcon": {
      color: "white",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    ".listIcon": {
      color: "white",
    },
  },
}))

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
          {!open && (
            <Typography noWrap component="div" sx={{ fontWeight: 600, fontSize: 18 }}>
              <FitnessCenterIcon htmlColor="white" sx={{ mb: -0.5, mr: 1 }} />
              FitnessTracker
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} width={240}>
        <DrawerHeader>
          {open && (
            <Typography
              noWrap
              component="div"
              color="primary"
              sx={{ fontWeight: 600, fontSize: 18 }}
            >
              <FitnessCenterIcon color="primary" sx={{ mb: -0.5, mr: 1 }} />
              FitnessTracker
            </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listItems.map(({ label, icon, route }) => (
            <ListItemButton
              key={label}
              onClick={() => router.push(route)}
              selected={router.pathname === route.pathname}
            >
              <ListItemIcon className="listIcon">{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
          <Divider />
          <ListItemButton key="logout" onClick={handleLogout}>
            <ListItemIcon className="listIcon">
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
