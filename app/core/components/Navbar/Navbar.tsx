import { useState, useEffect, ReactNode } from "react"
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
  SwipeableDrawer,
} from "@mui/material"
import { styled } from "@mui/material/styles"
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
  ProfileCircle as ProfileIcon,
  Weight as WeightIcon,
} from "app/assets/icons"

const listItems = [
  { label: "home", icon: <HouseIcon />, route: Routes.HomePage() },
  {
    label: "profile",
    icon: <ProfileIcon />,
    route: Routes.ProfilePage(),
  },
]

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  textTransform: "capitalize",
  ".listIcon": {
    color: "black",
  },
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
            <WeightIcon color="primary" sx={{ mb: -0.5, mr: 1 }} />
            FitnessTracker
          </Typography>
        )}
        <IconButton
          onClick={handleDrawerClose}
          sx={{ color: "black", "&:hover": { backgroundColor: "primary.light", color: "white" } }}
        >
          <ArrowLeftIcon />
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
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <Typography noWrap component="div" sx={{ fontWeight: 600, fontSize: 18 }}>
              <WeightIcon htmlColor="white" sx={{ mb: -0.5, mr: 1 }} />
              FitnessTracker
            </Typography>
          )}
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
