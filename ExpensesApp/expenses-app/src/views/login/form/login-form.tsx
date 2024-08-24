import React, { useState } from "react";
import InputComponent from "../../../utils/components/input-component/input-component";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import PrimaryButton from "../../../utils/components/primary-button/primary-button";
import axiosInstance from "../../../utils/mocks/axios";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../../utils/models";

const formError = {
  required: "All the fields are required",
  invalidEmail: "Email is invalid",
  wrongEmailOrPassword: "Email or Password are wrong, please try again",
};

interface LoginFormProps {
  setLoggedIn: (value: boolean) => void;
  setUser: (user: UserInterface) => void;
}

export default function LoginForm({ setLoggedIn, setUser }: LoginFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorFormData, setErrorFormData] = useState("");

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(email);
    return valid;
  };

  const onSubmit = () => {
    setErrorFormData(() => "");

    if (formData.password === "" || formData.email === "") {
      setErrorFormData(() => formError.required);
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorFormData(() => formError.invalidEmail);
      return;
    }

    login();
  };

  async function login() {
    const response = await axiosInstance
      .post("/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response: any) => {
        console.log("Login response:", response.data);
        if (response.data.isLoggedIn) {
          setLoggedIn(true);
          setUser(response.data.user);
          navigate("dashboard");
        } else {
          setErrorFormData(() => formError.wrongEmailOrPassword);
        }
        // Handle success
      })
      .catch((error: any) => {
        console.error("Error logging in:", error);
        // Handle error
      });
    return response;
  }

  return (
    <>
      <InputComponent
        inputType="email"
        inputName="email"
        inputData={handleChange}
      >
        <FaRegCircleUser size={30} />
      </InputComponent>
      <InputComponent
        inputType="password"
        inputName="password"
        inputData={handleChange}
        errorMessage={errorFormData}
      >
        <FaLock size={30} />
      </InputComponent>

      <PrimaryButton label={"Login"} onClick={onSubmit} />
    </>
  );
}
