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
import { useMutation, Routes, validateZodSchema } from "blitz"
import { Form, FormikProvider, useFormik } from "formik"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

type InitialValues = {
  email: string
  password: string
  afterSubmit?: string
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const formik = useFormik<InitialValues>({
    initialValues: { email: "", password: "" },
    validate: validateZodSchema(Signup),
    onSubmit: async (values, { setErrors }) => {
      try {
        await signupMutation(values)
        props.onSuccess?.()
      } catch (error: any) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          // This error comes from Prisma
          setErrors({ afterSubmit: "This email is already being used" })
        } else {
          setErrors({ afterSubmit: error.toString() })
        }
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik
  console.log(getFieldProps("password"))

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
          Sign Up
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
              Sign Up
            </LoadingButton>
          </Form>
        </FormikProvider>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href={Routes.SignupPage().pathname} variant="body2" underline="none">
              Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default SignupForm
