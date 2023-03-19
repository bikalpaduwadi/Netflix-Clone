import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";
// import { useRouter } from "next/router";

const Auth = () => {
  const VARIANT = {
    LOGIN: "Sign in",
    REGISTER: "Register",
  };

  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState(VARIANT.LOGIN);
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === VARIANT.LOGIN ? VARIANT.REGISTER : VARIANT.LOGIN
    );
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name: username,
        password,
      });

      login();
    } catch (error) {
      console.log("Error in user registration: ", error);
    }
  }, [email, username, password]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });

      // router.push("/");
    } catch (error) {
      console.log("Error in login: ", error);
    }
  }, [email, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === VARIANT.REGISTER && (
                <Input
                  id="username"
                  label="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              onClick={variant === VARIANT.LOGIN ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === VARIANT.LOGIN ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>

              <div
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === VARIANT.LOGIN
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === VARIANT.LOGIN ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
