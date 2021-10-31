import { useState } from "react"
import {
  TextField,
  Grid,
  Typography,
  Container,
  Alert,
  Paper,
  CircularProgress,
  InputAdornment,
  Snackbar,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { validateZodSchema, useQuery, useMutation } from "blitz"
import { Form, FormikProvider, useFormik } from "formik"
import { ProfileForm as UpdateForm } from "app/core/validations"
import { AutoSave } from "app/core/components/Form"
import getCurrentUser from "app/users/queries/getCurrentUser"
import updateUser from "app/core/mutations/updateUser"

type ProfileFormProps = {
  onSuccess?: () => void
}

type FormValues = {
  email: string
  name?: string
}

export const ProfileForm = (props: ProfileFormProps) => {
  const [open, setOpen] = useState(false)
  const [toaster, setToaster] = useState({ type: "", message: "" })
  const [user, { setQueryData }] = useQuery(getCurrentUser, null)
  const [updateUserMutation] = useMutation(updateUser)

  const formik = useFormik<FormValues>({
    initialValues: { email: user?.email || "", name: user?.name || "" },
    validate: validateZodSchema(UpdateForm),
    onSubmit: async (values, { setErrors }) => {
      try {
        if (values.name === user?.name && values.email === user?.email) return

        const newValues = await updateUserMutation(values)
        setQueryData(newValues)
        handleOpen("success", "Successfully updated.")
        props.onSuccess?.()
      } catch (error) {
        if (error.name === "EmailTakenError") {
          setErrors({ email: error.message })
          handleOpen("error", error.message)
        } else {
          handleOpen("error", "Sorry, something went wrong.")
        }
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  const handleOpen = (type, message) => {
    setToaster({ type, message })
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

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
      <Container fixed maxWidth="sm">
        <Grid container justifyContent="center" alignItems="center">
          <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
            <Typography component="h1" variant="h5" align="center">
              Profile
            </Typography>

            <FormikProvider value={formik}>
              <Form noValidate onSubmit={handleSubmit}>
                <AutoSave debounceMs={2000} />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email"
                  {...getFieldProps("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {isSubmitting && touched.email && <CircularProgress size={20} />}
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Full Name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {isSubmitting && touched.name && <CircularProgress size={20} />}
                      </InputAdornment>
                    ),
                  }}
                />
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ pt: 1, mt: 2, mb: 2 }}
                >
                  Update profile
                </LoadingButton>
              </Form>
            </FormikProvider>
          </Paper>
        </Grid>
      </Container>
    </>
  )
}

export default ProfileForm
