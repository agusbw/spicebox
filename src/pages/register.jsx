import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputErrorMessage from "../components/InputErrorMessage";
import { useAuth } from "../contexts/Auth";
import { TextInput } from "../components/FormComponents";
import loginImage from "../assets/login.webp";
import { useState } from "react";
import useUser from "../hooks/useUser";
import { Helmet } from "react-helmet";

export default function Register() {
  const { signUp } = useAuth();
  const { validateUsername } = useUser();
  const [messages, setMessages] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const isUsernameExist = await validateUsername(data.username);
    if (isUsernameExist.length > 0) {
      setMessages({
        type: "error",
        message: "Username is already in use",
      });
      return;
    }

    const { data: response, error } = await signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
        },
      },
    });

    if (response.user?.identities.length <= 0) {
      setMessages({
        type: "error",
        message: "Email is already in use, login or try another email",
      });
      return;
    }
    if (error) {
      setMessages({
        type: "error",
        message: "Something went wrong, try again later",
      });
      console.log(error);
      return;
    }
    setMessages({
      type: "success",
      message: "Check your email for the confirmation link",
    });
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Register | SpiceBox</title>
      </Helmet>
      <div className="flex min-h-screen w-screen items-center">
        <div className="hidden md:block w-3/6 h-screen">
          <img
            src={loginImage}
            alt="Login image"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full flex justify-center px-4">
          <div className="lg:max-w-lg">
            <h1 className="text-4xl font-bold">
              Register to our site and unlock exclusive content.
            </h1>
            <p className="my-2">
              Register with your credentials to create your account. You’ll be
              able to sign in and access our website after{" "}
              <span className="font-bold text-error">verify </span>
              your email!
            </p>
            {messages && (
              <div
                className={`${
                  messages.type === "error" ? "bg-red-100" : "bg-green-100"
                } p-3 rounded-lg`}
              >
                <InputErrorMessage
                  message={messages.message}
                  textColor={`${
                    messages.type === "error" ? "error" : "text-green-500"
                  }`}
                />
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-3">
                <div className="flex-1">
                  <TextInput
                    type="text"
                    label="Firstname"
                    name="firstname"
                    register={register("firstname", {
                      required: {
                        value: true,
                        message: "Firstname is required",
                      },
                    })}
                  />
                  {errors.firstname && (
                    <InputErrorMessage message={errors.firstname.message} />
                  )}
                </div>
                <div className="flex-1">
                  <TextInput
                    label="Lastname"
                    name="lastname"
                    type="text"
                    register={register("lastname", {
                      required: {
                        value: true,
                        message: "Lastname is required",
                      },
                    })}
                  />
                  {errors.lastname && (
                    <InputErrorMessage message={errors.lastname.message} />
                  )}
                </div>
              </div>
              <div>
                <TextInput
                  label="Username"
                  type="username"
                  name="username"
                  register={register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                    pattern: {
                      value: /^[a-z][a-z0-9]*([._-][a-z0-9]+){0,3}$/,
                      message: "Username not available",
                    },
                  })}
                />
                {errors.username && (
                  <InputErrorMessage message={errors.username.message} />
                )}
              </div>
              <div>
                <TextInput
                  label="Email"
                  type="email"
                  name="email"
                  register={register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <InputErrorMessage message={errors.email.message} />
                )}
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    register={register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <InputErrorMessage message={errors.password.message} />
                  )}
                </div>
                <div className="flex-1">
                  <TextInput
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    register={register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Confirm Password is required",
                      },
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Your passwords do not match";
                        }
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <InputErrorMessage
                      message={errors.confirmPassword.message}
                    />
                  )}
                </div>
              </div>
              <p className="text-md my-3">
                Already have account?{" "}
                <Link
                  to={"/login"}
                  className="hover:text-red-300 font-semibold"
                >
                  Login
                </Link>
              </p>

              <button
                className={`btn btn-secondary px-20 mb-5 md:mb-0 ${
                  isSubmitting ? "loading" : ""
                }`}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
