import type React from "react";
import LoginForm from "../components/login/loginForm";

export const LoginPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Login Page</h1>

      <LoginForm />
    </div>
  );
}