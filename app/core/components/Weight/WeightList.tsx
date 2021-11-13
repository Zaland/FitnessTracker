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
  Toolbar,
  Checkbox,
  Tooltip,
  IconButton,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import { visuallyHidden } from "@mui/utils"
import { useMutation } from "blitz"
import { format, compareAsc, compareDesc } from "date-fns"
import { Edit as EditIcon, Delete as DeleteIcon } from "app/assets/icons"
import { WeightProps } from "./Weight"
import deleteWeight from "app/core/mutations/weight/deleteWeights"

type Order = "asc" | "desc"

type WeightListProps = {
  weights: WeightProps[]
  onFetchWeights: () => void
}

export const WeightList = ({ weights, onFetchWeights }: WeightListProps) => {
  const [order, setOrder] = useState<Order>("desc")
  const [orderBy, setOrderBy] = useState<keyof WeightProps>("logDate")
  const [selected, setSelected] = useState<number[]>([])
  const [deleteWeightMutation] = useMutation(deleteWeight)

  const handleTableSort = (property: keyof WeightProps) => {
    const isAsc = orderBy === property && order === "asc"

    weights.sort((weight1, weight2) => {
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

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = weights.map((item) => item.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (id: number) => {
    const newList =
      selected.indexOf(id) !== -1 ? selected.filter((item) => item !== id) : [...selected, id]
    setSelected(newList)
  }

  const handleDeleteWeights = async () => {
    await deleteWeightMutation(selected)
    setSelected([])
    onFetchWeights()
  }

  return (
    <>
      <Paper elevation={3} sx={{ width: "100%", mt: 3 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
              Weights
            </Typography>
          )}
          {selected.length === 1 && (
            <Tooltip title="Edit (Work in progress)">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {selected.length > 0 && (
            <Tooltip title="Delete">
              <IconButton onClick={handleDeleteWeights}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {weights.length > 1 && (
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < weights.length}
                      onChange={handleSelectAll}
                      checked={weights.length > 0 && selected.length === weights.length}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "logDate"}
                    direction={orderBy === "logDate" ? order : "asc"}
                    onClick={() => handleTableSort("logDate")}
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
                    onClick={() => handleTableSort("amount")}
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
                  onClick={() => handleClick(row.id)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected.indexOf(row.id) !== -1} />
                  </TableCell>
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
        {!weights.length && (
          <Typography align="center" sx={{ padding: 2.5 }}>
            No data to display!
          </Typography>
        )}
      </Paper>
    </>
  )
}
