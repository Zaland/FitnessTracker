import { useState, useEffect } from "react"
import { Grid, Container, Box, CircularProgress, Paper } from "@mui/material"
import { useMutation } from "blitz"
import { AddWeight } from "./AddWeight"
import { WeightList } from "./WeightList"
import getAllWeights from "app/core/mutations/weight/getAllWeights"

export type WeightProps = {
  id: number
  amount: number
  isTypePounds: boolean
  logDate: Date
}

export const Weight = () => {
  const [fetchWeightsMutation] = useMutation(getAllWeights)
  const [weights, setWeights] = useState<Array<WeightProps>>([])
  const [isFetching, setIsFetching] = useState(true)

  const handleFetchWeights = async () => {
    const weightsList = await fetchWeightsMutation()
    if (weightsList) {
      setWeights(weightsList)
    }
    setIsFetching(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchWeights()
    }
    fetchData()
  }, [])

  return (
    <Container fixed maxWidth="md">
      <Grid container justifyContent="center" alignItems="center">
        <AddWeight onFetchWeights={handleFetchWeights} />
        {isFetching ? (
          <Paper sx={{ width: "100%", mt: 3 }}>
            <Box sx={{ padding: 5, textAlign: "center" }}>
              <CircularProgress />
            </Box>
          </Paper>
        ) : (
          <WeightList weights={weights} onFetchWeights={handleFetchWeights} />
        )}
      </Grid>
    </Container>
  )
}

export default Weight
