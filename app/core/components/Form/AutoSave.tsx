import { useCallback, useEffect } from "react"
import { debounce } from "lodash-es"
import { useFormikContext } from "formik"

export const AutoSave = ({ debounceMs }) => {
  const { values, submitForm } = useFormikContext()

  const debouncedSave = useCallback(
    debounce(() => submitForm(), debounceMs),
    [debounceMs, submitForm]
  )

  useEffect(() => {
    debouncedSave()
  }, [debouncedSave, values])

  return null
}
