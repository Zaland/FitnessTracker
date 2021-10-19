import { BlitzPage } from "blitz"
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { AccountCircle } from "@mui/icons-material"

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600,
    flexGrow: 1,
  },
  icon: {
    color: "white",
    fontSize: 30,
  },
  link: {
    color: "white",
    fontWeight: 600,
  },
}))

const Navbar: BlitzPage = () => {
  const classes = useStyles()

  return (
    <AppBar>
      <Toolbar>
        <Typography className={classes.title}>FitnessTracker</Typography>
        <Tooltip title="Profile">
          <IconButton>
            <AccountCircle className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Button variant="text" className={classes.link}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
