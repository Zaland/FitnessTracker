import {
  Grid,
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material"
import { FitnessCenter } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Form, FormikProvider, useFormik } from "formik"
import { BlitzPage, useMutation, validateZodSchema, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const formik = useFormik({
    initialValues: { email: "" },
    validate: validateZodSchema(ForgotPassword),
    onSubmit: async (values, { setErrors }) => {
      try {
        await forgotPasswordMutation(values)
      } catch (error: any) {
        setErrors({ afterSubmit: "Sorry, we had an unexpected error. Please try again." })
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <FitnessCenter />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>

        {isSuccess ? (
          <>
            <Typography sx={{ marginTop: 3 }}>
              Request submitted! If your email is in our system, you will receive instructions to
              reset your password shortly.
            </Typography>
            <Link
              href={Routes.LoginPage().pathname}
              variant="body2"
              underline="none"
              sx={{ marginTop: 2 }}
            >
              Return to login
            </Link>
          </>
        ) : (
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <TextField
                margin="normal"
                fullWidth
                type="email"
                label="Email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                reset password
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={Routes.LoginPage().pathname} variant="body2" underline="none">
                    Return to login
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        )}
      </Box>
    </Container>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot password">{page}</Layout>

export default ForgotPasswordPage
