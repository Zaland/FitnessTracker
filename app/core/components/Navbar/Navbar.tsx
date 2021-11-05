import { useState, useEffect, ReactNode } from "react"
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
  SwipeableDrawer,
} from "@mui/material"
import { Routes, useMutation, useRouter } from "blitz"
import { AppBar } from "./AppBar"
import { Drawer, DrawerHeader } from "./Drawer"
import { useWidth } from "app/core/hooks/useWidth"
import logout from "app/auth/mutations/logout"
import {
  ArrowLeft as ArrowLeftIcon,
  House as HouseIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Moon as MoonIcon,
  ProfileCircle as ProfileIcon,
  Sun as SunIcon,
  Watch as WatchIcon,
  Weight as WeightIcon,
} from "app/assets/icons"

export type NavbarProps = {
  darkMode: boolean
  onThemeChange: () => void
  children: ReactNode
}

const listItems = [
  { label: "home", icon: <HouseIcon />, route: Routes.HomePage() },
  { label: "weight", icon: <WeightIcon />, route: Routes.WeightPage() },
  {
    label: "profile",
    icon: <ProfileIcon />,
    route: Routes.ProfilePage(),
  },
]

export const Navbar = ({ darkMode, onThemeChange, children }: NavbarProps) => {
  const [open, setOpen] = useState(false)
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()
  const width = useWidth()

  const iOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent)

  useEffect(() => {
    if (width === "xs") {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [width])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    await logoutMutation()
  }

  const renderDrawerItems = () => (
    <>
      <DrawerHeader>
        {open && (
          <Typography noWrap component="div" color="primary" sx={{ fontWeight: 600, fontSize: 18 }}>
            <WatchIcon color="primary" sx={{ mb: -0.5, mr: 1 }} />
            FitnessTracker
          </Typography>
        )}
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            "&:hover": {
              backgroundColor: darkMode ? "primary.dark" : "primary.light",
              color: "white",
            },
          }}
        >
          <ArrowLeftIcon className="listIcon" />
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
    </>
  )

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
              <WatchIcon htmlColor="white" sx={{ mb: -0.5, mr: 1 }} />
              FitnessTracker
            </Typography>
          )}
          <div style={{ flexGrow: 1 }} />
          <IconButton onClick={onThemeChange} color="inherit">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      {width === "xs" ? (
        <SwipeableDrawer
          anchor="left"
          open={open}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: 240 } }}
        >
          {renderDrawerItems()}
        </SwipeableDrawer>
      ) : (
        <Drawer variant="permanent" open={open} width={240}>
          {renderDrawerItems()}
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
