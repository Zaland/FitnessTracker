import { Grid, Container } from "@mui/material"
import { AddWeight } from "./AddWeight"

export const Weight = () => {
  return (
    <Container fixed maxWidth="md">
      <Grid container justifyContent="center" alignItems="center">
        <AddWeight />
      </Grid>
    </Container>
  )
}

export default Weight
