import {
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  CircularProgress,
  InputAdornment,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useSnackbar } from "notistack"
import { validateZodSchema, useQuery, useMutation } from "blitz"
import { Form, FormikProvider, useFormik } from "formik"
import { ProfileForm as UpdateForm } from "app/core/validations"
import { AutoSave } from "app/core/components/Form"
import getCurrentUser from "app/queries/getCurrentUser"
import updateUser from "app/core/mutations/updateUser"

type ProfileFormProps = {
  onSuccess?: () => void
}

type FormValues = {
  email?: string
  name?: string
}

export const ProfileForm = (props: ProfileFormProps) => {
  const [user, { setQueryData }] = useQuery(getCurrentUser, null)
  const [updateUserMutation] = useMutation(updateUser)
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik<FormValues>({
    initialValues: { email: user?.email || "", name: user?.name || "" },
    validate: validateZodSchema(UpdateForm),
    onSubmit: async (values, { setFieldTouched, setErrors }) => {
      try {
        const valuesToUpdate: FormValues = {}

        if (values.email !== user?.email) {
          setFieldTouched("email", true)
          valuesToUpdate.email = values.email
        } else {
          setFieldTouched("email", false)
        }

        if (values.name !== user?.name) {
          setFieldTouched("name", true)
          valuesToUpdate.name = values.name
        } else {
          setFieldTouched("name", false)
        }

        if (!valuesToUpdate?.name && !valuesToUpdate?.email) return

        const newValues = await updateUserMutation(valuesToUpdate)
        setQueryData(newValues)
        enqueueSnackbar("Successfully updated.", { variant: "success" })
        props.onSuccess?.()
      } catch (error) {
        if (error.name === "EmailTakenError") {
          setErrors({ email: error.message })
          enqueueSnackbar(error.message, { variant: "error" })
        } else {
          enqueueSnackbar("Sorry, something went wrong.", { variant: "error" })
        }
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <>
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
