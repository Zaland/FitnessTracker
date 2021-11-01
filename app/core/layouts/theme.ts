import { createTheme, Theme } from "@mui/material"

export const generateTheme = (theme: Theme, darkMode: boolean) =>
  createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 13,
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            ".listIcon": {
              color: darkMode ? "white" : "black",
            },
            "&.Mui-selected": {
              backgroundColor: theme?.palette?.primary?.main,
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
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            fontWeight: 600,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#DADADA",
      },
    },
  })
