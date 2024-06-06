import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import logo from "/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import authImage from "../../../assets/authImage.jfif";
import useAuth from "../../../hooks/useAuth";
import DynamicTitle from "../../../components/Shared/DynamicTitle/DynamicTitle";
import SocialLogin from "../../../components/Shared/SocialLogin/SocialLogin";



const Login = () => {
  const [toggle, setToggle] = useState(false);
  const { signIn,  loading, setLoading } =
    useAuth();

  // navigate user
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
//   const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    } else if (errors.password) {
      toast.error(errors.password.message);
    }
  }, [errors.email, errors.password]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setLoading(true);
      //1. sign in user
      await signIn(email, password);
    //   setEmail(email)

      navigate(from);
      toast.success("Sign In Successful");
    } catch (error) {
      toast.error(
        error?.message?.split("(")[1].replace(")", "").split("/")[1] ||
          "An error occurred while logging."
      );
    }
  };

//   const handleResetPassword = async () => {
//     if (!email) return toast.error("Please enter a valid email");
//     try {
//       await resetPassword(email);
//       toast.success("Password reset email sent");
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.message);
//       setLoading(false);
//     }
//   };






  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <DynamicTitle pageTitle="Login" />
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 ">
            Welcome back!
          </p>

          <SocialLogin/>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <div className="text-xs text-center text-gray-500  hover:underline">
              or Login with email
            </div>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                autoComplete="email"
                // onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "You must fill Email input field",
                  },
                })}
              />
            </div>

            <div className="mt-4 relative">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                autoComplete="current-password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type={toggle ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "You must fill Password input field",
                  },
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 character",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                    message:
                      "Password must contain at least one uppercase letter and one lowercase letter.",
                  },
                })}
              />
              <div
                className="absolute text-xl top-10 right-2"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <LuEye /> : <LuEyeOff />}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4D95EA] rounded-lg hover:bg-[#2f86eb] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          {/* <div className="space-y-1">
            <button
              onClick={handleResetPassword}
              className="text-xs hover:underline hover:text-red-500 text-gray-800"
            >
              Forgot password?
            </button>
          </div> */}

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/signup"
              className="text-lg text-blue-700 underline  hover:underline"
            >
              or Sign Up
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${authImage})`,
          }}
        ></div>
      </div>
    </div>
  );
};



export default Login;
