import { useState } from "react"
import { validateZodSchema, useMutation } from "blitz"
import {
  TextField,
  Grid,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from "@mui/material"
import { LocalizationProvider, DatePicker, LoadingButton } from "@mui/lab"
import DateAdapter from "@mui/lab/AdapterDateFns"
import { Form, FormikProvider, useFormik } from "formik"
import { WeightForm } from "app/core/validations"
import addWeight from "app/core/mutations/weight/addWeight"

type AddWeightProps = {
  onSuccess?: () => void
  onFetchWeights: () => void
}

type FormValues = {
  amount: number
  isTypePounds: boolean
  logDate: Date
}

export const AddWeight = ({ onSuccess, onFetchWeights }: AddWeightProps) => {
  const [open, setOpen] = useState(false)
  const [toaster, setToaster] = useState({ type: "", message: "" })
  const [addWeightMutation] = useMutation(addWeight)

  const formik = useFormik<FormValues>({
    initialValues: { amount: 0, isTypePounds: true, logDate: new Date() },
    validate: validateZodSchema(WeightForm),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addWeightMutation(values)
        onFetchWeights()
        resetForm()
        console.log("success", values)
        handleOpen("success", "Successfully updated.")
        onSuccess?.()
      } catch (error) {
        console.log({ error })
        handleOpen("error", "Sorry, something went wrong.")
      }
    },
  })

  const { handleSubmit, isSubmitting, values, setFieldValue } = formik

  const handleOpen = (type, message) => {
    setToaster({ type, message })
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleToggle = (event) =>
    setFieldValue("isTypePounds", event.target.value === "lb" ? true : false)

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity={toaster.type === "success" ? "success" : "error"}>{toaster.message}</Alert>
      </Snackbar>
      <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
        <Typography component="h1" variant="h5" align="center">
          Weight
        </Typography>
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item sm={7}>
                <Grid container spacing={2}>
                  <Grid item sm={8}>
                    <TextField
                      margin="normal"
                      fullWidth
                      label="Weight"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      value={values.amount}
                      onChange={(event) => {
                        const num = Number(event.target.value)
                        if (num) {
                          setFieldValue("amount", num)
                        }
                      }}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <ToggleButtonGroup
                      fullWidth
                      exclusive
                      color="primary"
                      sx={{ marginTop: 2.5 }}
                      value={values.isTypePounds ? "lb" : "kg"}
                      onChange={handleToggle}
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
                    value={values.logDate}
                    onChange={(event) => setFieldValue("logDate", event)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ pt: 1, mt: 2, mb: 2 }}
            >
              Add weight
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Paper>
    </>
  )
}
