import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Box, Button, Center, useColorModeValue } from "@chakra-ui/react"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
      <FormProvider {...ctx}>
        <form
          onSubmit={ctx.handleSubmit(async (values) => {
            const result = (await onSubmit(values)) || {}
            for (const [key, value] of Object.entries(result)) {
              if (key === FORM_ERROR) {
                setFormError(value)
              } else {
                ctx.setError(key as any, {
                  type: "submit",
                  message: value,
                })
              }
            }
          })}
          className="form"
          {...props}
        >
          {/* Form fields supplied as children are rendered here */}
          {children}

          {formError && (
            <div role="alert" style={{ color: "red" }}>
              {formError}
            </div>
          )}

          {submitText && (
            <Center>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type={"submit"}
                disabled={ctx.formState.isSubmitting}
              >
                {submitText}
              </Button>
            </Center>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      </FormProvider>
    </Box>
  )
}

export default Form
