import {
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material"
import { FitnessCenter } from "@mui/icons-material"
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
    onSubmit: async (values, { setSubmitting, setErrors }) => {
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
              sx={{ mt: 3, mb: 2 }}
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
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default LoginForm
