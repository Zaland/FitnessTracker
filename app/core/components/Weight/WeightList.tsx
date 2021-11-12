import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
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
      <TableContainer component={Paper} elevation={5} sx={{ marginTop: 2 }}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weights.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  {format(row.logDate, "LLL d, yyyy")}
                </TableCell>
                <TableCell align="center">{`${row.amount} ${
                  row.isTypePounds ? "lb" : "kg"
                }`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
)
