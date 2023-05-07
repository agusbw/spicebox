import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputErrorMessage from "../components/InputErrorMessage";
import { TextInput } from "../components/FormComponents";
import { useState } from "react";
import { useAuth } from "../contexts/Auth";
import loginImage from "../assets/login.webp";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const [loginFailed, setLoginFailed] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { error } = await signIn({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setLoginFailed(true);
    } else {
      setLoginFailed(false);
      navigate("/");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | SpiceBox</title>
      </Helmet>
      <div className="flex h-screen w-screen items-center">
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
              Login to get full access to our website.
            </h1>
            <p className="my-2">
              Login with your credentials to connect your account. You’ll be
              able to sign in and access our website.
            </p>
            {loginFailed && (
              <div className="bg-red-100 p-3 rounded-lg">
                <InputErrorMessage message="Invalid email or password" />
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextInput
                  type="email"
                  label="Email"
                  name="email"
                  register={register("email")}
                />
              </div>
              <div className="mb-2">
                <TextInput
                  type="password"
                  label="Password"
                  name="password"
                  register={register("password")}
                />
              </div>
              <p className="text-md  ">
                Dont have any account?{" "}
                <Link to={"/register"} className="hover:text-red-300 font-bold">
                  Register
                </Link>
              </p>
              <button
                className={`btn btn-md btn-secondary px-16 mt-4 ${
                  isSubmitting ? "loading" : ""
                }`}
              >
                login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
