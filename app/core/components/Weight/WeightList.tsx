import { TextField, Grid, Typography, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { format } from "date-fns"
import { WeightProps } from "./Weight"

type WeightListProps = {
  weights: WeightProps[]
}

export const WeightList = ({ weights }: WeightListProps) => (
  <>
    <Paper elevation={3} sx={{ padding: 3, width: "100%", mt: 3 }}>
      <Typography component="h1" variant="h5" align="center">
        Weight list
      </Typography>
      {weights.map((weight) => (
        <Grid container spacing={4} key={weight.id}>
          <Grid item sm={7}>
            <Grid container spacing={2}>
              <Grid item sm={8}>
                <TextField
                  margin="normal"
                  label="Weight"
                  fullWidth
                  disabled
                  InputLabelProps={{ shrink: true }}
                  value={weight.amount}
                />
              </Grid>
              <Grid item sm={4}>
                <ToggleButtonGroup
                  fullWidth
                  exclusive
                  color="primary"
                  disabled
                  sx={{ marginTop: 2.5 }}
                  value={weight.isTypePounds ? "lb" : "kg"}
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
            <TextField
              margin="normal"
              label="Date"
              fullWidth
              disabled
              InputLabelProps={{ shrink: true }}
              value={format(weight.logDate, "MM/dd/yyyy")}
            />
          </Grid>
        </Grid>
      ))}
    </Paper>
  </>
)
