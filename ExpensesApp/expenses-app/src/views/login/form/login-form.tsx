import { useState } from "react";
import PrimaryButton from "../../../utils/components/primary-button/primary-button";
import axiosInstance from "../../../utils/mocks/axios";
import { useNavigate } from "react-router-dom";
import InputTransaction from "../../../utils/components/input-transaction/input-transaction";
import { ViewProps } from "../../../utils/models";

const formError = {
  required: "All the fields are required",
  invalidEmail: "Email is invalid",
  wrongEmailOrPassword: "Email or Password are wrong, please try again",
};

export default function LoginForm({ setLoggedIn }: ViewProps) {
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
          localStorage.setItem("loggedIn", "true");
          setLoggedIn(true);
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
      <InputTransaction
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        error={!!errorFormData}
        onChange={handleChange}
      />

      <InputTransaction
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        error={!!errorFormData}
        onChange={handleChange}
      />

      {!!errorFormData ? (
        <span style={{ color: "red", height: "1rem", lineHeight: "1rem" }}>
          {errorFormData}
        </span>
      ) : (
        <div style={{ height: "1.5rem" }}></div>
      )}

      <PrimaryButton label={"Login"} onClick={onSubmit} />
    </>
  );
}
