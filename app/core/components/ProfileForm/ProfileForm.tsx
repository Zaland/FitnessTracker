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
  name?: string
  afterSubmit?: string
}

export const ProfileForm = (props: ProfileFormProps) => {
  const [success, setSuccess] = useState(false)
  const [user, { setQueryData }] = useQuery(getCurrentUser, null)
  const [updateUserMutation] = useMutation(updateUser)

  const formik = useFormik<FormValues>({
    initialValues: { name: user?.name || "" },
    validate: validateZodSchema(UpdateForm),
    onSubmit: async (values, { setErrors }) => {
      try {
        if (values.name === user?.name) return

        const newValues = await updateUserMutation(values)
        setQueryData(newValues)
        setSuccess(true)
        props.onSuccess?.()
      } catch (error) {
        setErrors({ afterSubmit: "Sorry, something went wrong" })
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <Container fixed maxWidth="sm">
      <Grid container justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
          <Typography component="h1" variant="h5" align="center">
            Profile
          </Typography>

          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              <AutoSave debounceMs={2000} />
              {success && <Alert onClose={() => setSuccess(false)}>Successfully updated!</Alert>}
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <TextField
                margin="normal"
                fullWidth
                disabled
                label="Email"
                value={user?.email || ""}
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
                      {isSubmitting && <CircularProgress size={20} />}
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
  )
}

export default ProfileForm
