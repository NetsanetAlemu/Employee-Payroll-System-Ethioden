import * as Yup from "yup";
const pattern = RegExp("");

export const AddEmployeeSchema = Yup.object({
  first_name: Yup.string()
    .required("Please Enter first name")
    .min(3, "First name should be at least 3 characters"),
  last_name: Yup.string()
    .required("Please Enter last name")
    .min(3, "Last name should be at least 3 characters"),
  gender: Yup.string().required("Please Enter gender"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please Enter email"),
  phone_number: Yup.string()
    .min(10, "Password should be atleast 10 characters")
    .matches(pattern, "Please enter valid phone number")
    .required("Please Enter phone number"),
});