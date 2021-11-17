import { createTheme } from "@mui/material"
import { deepPurple, lime } from "@mui/material/colors"

export const generateTheme = (darkMode: boolean) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: lime[600],
      },
    },
  })

  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? deepPurple[400] : deepPurple[500],
      },
      secondary: {
        main: lime[600],
      },
      background: {
        default: darkMode ? "#121212" : "#DADADA",
      },
    },
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
              color: theme.palette.mode === "dark" ? theme.palette.primary.dark : "white",
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
      },
    },
  })
}
