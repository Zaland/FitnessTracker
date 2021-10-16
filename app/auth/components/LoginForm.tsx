import { TextField, Link, Grid, Typography, Container, Alert, Paper } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useMutation, Routes, validateZodSchema, AuthenticationError } from "blitz"
import { Form, FormikProvider, useFormik } from "formik"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

type InitialValues = {
  email: string
  password: string
  afterSubmit?: string
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const formik = useFormik<InitialValues>({
    initialValues: { email: "", password: "" },
    validate: validateZodSchema(Login),
    onSubmit: async (values, { setErrors }) => {
      try {
        await loginMutation(values)
        props.onSuccess?.()
      } catch (error: any) {
        if (error instanceof AuthenticationError) {
          setErrors({ afterSubmit: "Sorry, those credentials are invalid" })
        } else {
          setErrors({
            afterSubmit:
              "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
          })
        }
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>

          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <TextField
                margin="normal"
                fullWidth
                type="email"
                label="Email Address"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                type="password"
                label="Password"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ pt: 1, mt: 2, mb: 2 }}
              >
                Login
              </LoadingButton>
            </Form>
          </FormikProvider>

          <Grid container>
            <Grid item xs>
              <Link href={Routes.ForgotPasswordPage().pathname} variant="body2" underline="none">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={Routes.SignupPage().pathname} variant="body2" underline="none">
                Signup
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  )
}

export default LoginForm
