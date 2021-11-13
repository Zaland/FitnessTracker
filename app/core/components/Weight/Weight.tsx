import { useState, useEffect } from "react"
import { Grid, Container } from "@mui/material"
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

  const handleFetchWeights = async () => {
    const weightsList = await fetchWeightsMutation()
    if (weightsList) {
      setWeights(weightsList)
    }
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
        <WeightList weights={weights} onFetchWeights={handleFetchWeights} />
      </Grid>
    </Container>
  )
}

export default Weight
