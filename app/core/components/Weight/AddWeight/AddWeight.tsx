import { useState } from "react"
import { TextField, Grid, Typography, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { LocalizationProvider, DatePicker, LoadingButton } from "@mui/lab"
import DateAdapter from "@mui/lab/AdapterDateFns"

export const AddWeight = () => {
  const [alignment, setAlignment] = useState("web")

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
      <Typography component="h1" variant="h5" align="center">
        Weight
      </Typography>
      <Grid container spacing={4}>
        <Grid item sm={7}>
          <Grid container spacing={2}>
            <Grid item sm={8}>
              <TextField margin="normal" fullWidth label="Weight" type="number" />
            </Grid>
            <Grid item sm={4}>
              <ToggleButtonGroup
                fullWidth
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                sx={{ marginTop: 2.5 }}
              >
                <ToggleButton value="lb" defaultChecked>
                  lb
                </ToggleButton>
                <ToggleButton value="kg">kg</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              value={Date()}
              onChange={() => {
                console.log("updating date")
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <LoadingButton type="submit" fullWidth variant="contained" sx={{ pt: 1, mt: 2, mb: 2 }}>
        Add weight
      </LoadingButton>
    </Paper>
  )
}
