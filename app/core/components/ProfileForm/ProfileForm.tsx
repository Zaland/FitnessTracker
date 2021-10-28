import { TextField, Grid, Typography, Container, Alert, Paper } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { validateZodSchema } from "blitz"
import { Form, FormikProvider, useFormik } from "formik"
import { z } from "zod"

const UpdateProfile = z.object({
  fullName: z.optional(z.string()),
})

type ProfileFormProps = {
  onSuccess?: () => void
}

type FormValues = {
  fullName?: string
  afterSubmit?: string
}

export const ProfileForm = (props: ProfileFormProps) => {
  const formik = useFormik<FormValues>({
    initialValues: { fullName: "" },
    validate: validateZodSchema(UpdateProfile),
    onSubmit: async (_values, { setErrors }) => {
      try {
        console.log("Success updating")
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
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <TextField
                margin="normal"
                fullWidth
                label="Full Name"
                {...getFieldProps("fullName")}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
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
