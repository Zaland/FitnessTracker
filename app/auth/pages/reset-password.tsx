import { useEffect, useState } from "react"
import { Grid, TextField, Link, Typography, Container, Alert, Paper } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Form, FormikProvider, useFormik } from "formik"
import { BlitzPage, useRouterQuery, useMutation, useRouter, Routes, validateZodSchema } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const router = useRouter()
  const [renderPage, setRenderPage] = useState(false)

  useEffect(() => {
    if (!query.token) {
      router.push(Routes.LoginPage())
    } else {
      setRenderPage(true)
    }
  }, [query.token, router])

  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const formik = useFormik({
    initialValues: { password: "", passwordConfirmation: "", token: query.token as string },
    validate: validateZodSchema(ResetPassword),
    onSubmit: async (values, { setErrors }) => {
      try {
        await resetPasswordMutation(values)
      } catch (error: any) {
        if (error.name === "ResetPasswordError") {
          setErrors({ afterSubmit: error.message })
        } else {
          setErrors({
            afterSubmit: "Sorry, we had an unexpected error. Please try again.",
          })
        }
      }
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return renderPage ? (
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
            Reset password
          </Typography>

          {isSuccess ? (
            <>
              <Typography sx={{ marginTop: 3 }}>Password reset successfully!</Typography>
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
                  type="password"
                  label="Password"
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  {...getFieldProps("passwordConfirmation")}
                  error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                  helperText={touched.passwordConfirmation && errors.passwordConfirmation}
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
        </Paper>
      </Grid>
    </Container>
  ) : null
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset password">{page}</Layout>

export default ResetPasswordPage
