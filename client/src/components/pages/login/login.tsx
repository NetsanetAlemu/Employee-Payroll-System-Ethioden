/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Header } from "../../sections/header/header";
import { FlashMessage } from "../../utils/flash_message/flash_message";
import {
  Form,
  Input,
  InputContainer,
  Label,
  Button,
  Title,
  PasswordContainer,
} from "../../utils/form_elements/form.style";
import { PasswordVisible } from "../../utils/password_visiblity/password.style";
import { HomeContainer } from "../home/homepage.style";
import {
  Text,
  CheckboxContainer,
  CustomLink,
  LoginContainer,
  LinkContainer,
  Checkbox,
  ActionsContainer,
} from "./login.style";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../schema/SignUpSchema";

export const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisiblity = () => {
    setPasswordVisible(!passwordVisible);
  };

  const formHandler = useFormik({
    initialValues: {
      empID: "",
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, _) => {
      console.log(values);
    },
  });
  return (
    <HomeContainer>
      <Header />
      <LoginContainer>
        <Title>Log In</Title>
        <Form>
          <InputContainer>
            <Label>User name</Label>
            <Input />
          </InputContainer>
          <InputContainer>
            <Label>Password</Label>
            <PasswordContainer>
              <input type={passwordVisible ? "text" : "password"} />
              <PasswordVisible onClick={togglePasswordVisiblity}>
                {passwordVisible ? <RiEyeFill /> : <RiEyeOffFill />}
              </PasswordVisible>
            </PasswordContainer>
          </InputContainer>
          <ActionsContainer>
            <CheckboxContainer>
              <Checkbox type="checkbox" /> <Text> Remember me</Text>
            </CheckboxContainer>
            <CustomLink>
              <Link to="/forgot_password">Frogot Password?</Link>
            </CustomLink>
          </ActionsContainer>

          <Button type="submit" onClick={(e) => e.stopPropagation()}>
            Login
          </Button>
        </Form>
        <LinkContainer>
          <Text>Don't have an account? </Text>
          <CustomLink>
            <Link to="/signup"> Sign up </Link>
          </CustomLink>
        </LinkContainer>
      </LoginContainer>
      <FlashMessage />
    </HomeContainer>
  );
};
