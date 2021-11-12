import { useState } from "react"
import {
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"
import { format, compareAsc, compareDesc } from "date-fns"
import { WeightProps } from "./Weight"

type Order = "asc" | "desc"

type WeightListProps = {
  weights: WeightProps[]
}

export const WeightList = ({ weights }: WeightListProps) => {
  const [order, setOrder] = useState<Order>("desc")
  const [orderBy, setOrderBy] = useState<keyof WeightProps>("logDate")

  const handleTableSort = (_event: React.MouseEvent<unknown>, property: keyof WeightProps) => {
    const isAsc = orderBy === property && order === "asc"

    weights.sort((weight1, weight2) => {
      console.log({ weight1, weight2 })

      if (property === "logDate") {
        return isAsc
          ? compareDesc(weight1.logDate, weight2.logDate)
          : compareAsc(weight1.logDate, weight2.logDate)
      } else {
        return isAsc ? weight2.amount - weight1.amount : weight1.amount - weight2.amount
      }
    })

    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  return (
    <>
      <Paper elevation={3} sx={{ padding: 3, width: "100%", mt: 3 }}>
        <Typography component="h1" variant="h5" align="center">
          Weight list
        </Typography>
        <TableContainer component={Paper} elevation={5} sx={{ marginTop: 2 }}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "logDate"}
                    direction={orderBy === "logDate" ? order : "asc"}
                    onClick={(event) => handleTableSort(event, "logDate")}
                  >
                    Date
                    {orderBy === "logDate" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "amount"}
                    direction={orderBy === "amount" ? order : "asc"}
                    onClick={(event) => handleTableSort(event, "amount")}
                  >
                    Weight
                    {orderBy === "amount" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weights.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
}
