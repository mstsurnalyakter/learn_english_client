import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import logo from "/logo.png";
import authImage from '../../../assets/authImage.jfif'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DynamicTitle from "../../../components/Shared/DynamicTitle/DynamicTitle";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";


const SingUp = () => {
  const [toggle, setToggle] = useState(false);

  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
    signInWithGitHub,
  } = useAuth();

  // navigate user
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
    } else if (errors.email) {
      toast.error(errors.email.message);
    } else if (errors.photo) {
      toast.error(errors.photo.message);
    } else if (errors.password) {
      toast.error(errors.password.message);
    } else if (errors.termsConditions) {
      toast.error(errors.termsConditions.message);
    }
  }, [
    errors.name,
    errors.email,
    errors.photo,
    errors.termsConditions,
    errors.password,
  ]);

  const onSubmit = async (data) => {
    const { name, email, photo, password, role } = data;
    console.log(name, email, photo, password, role);


    try {
      // 1. upload image and get image url
      setLoading(true);

      const imageURL = await imageUpload(photo[0]);
      console.log(imageURL);

      //2.user registration
      const result = await createUser(email, password);
      console.log(result);

      //3.update user profile
      await updateUserProfile(name, imageURL);
      if (result) {
          toast.success("Sign Up Successful");
          setTimeout(() => {
             navigate("/");
           window.location.reload();
         }, 2000);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // handle google sign in
  const handleGoogleSignIn = async () => {
    try {
     const result = await signInWithGoogle();
     if (result?.user) {
         toast.success("Sign In with Google successful.");
         navigate("/");
     }
    } catch (error) {
      toast.error(error.message);
    }
  };
    const handleGithubSignIn = async () => {
      try {
        await signInWithGitHub();
        navigate("/");
        toast.success("Sign In with GitHub successful.");
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)]">
      <DynamicTitle pageTitle="Sign Up" />
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 ">
            Create an account
          </p>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 "
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </div>

          <div
            onClick={handleGithubSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 "
          >
            <div className="px-4 py-2">
              <FaGithub />
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with GitHub
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <div className="text-xs text-center text-gray-500  hover:underline">
              or Registration with email
            </div>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="name"
              >
                Username
              </label>
              <input
                id="name"
                autoComplete="name"
                name="name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "You must fill Name input field",
                  },
                })}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="photo"
              >
                Photo URL
              </label>
              <input
                id="photo"
                autoComplete="photo"
                name="photo"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="file"
                {...register("photo", {
                  required: {
                    value: true,
                    message: "You must fill Photo URL input field",
                  },
                })}
              />
            </div>
            <div className="mt-4">
              <select
                name="role"
                id="role"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Select Role"
                {...register("role", { required: true })}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
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
            <div className="flex mt-4 items-center flex-row gap-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                {...register("termsConditions", {
                  required: {
                    value: true,
                    message: "You need to agree with terms and conditions",
                  },
                })}
              />
              <label className="label">
                <span className="label-text">
                  I agree with{" "}
                  <Link className="underline text-[#0073e1]">
                    terms & conditions
                  </Link>
                </span>
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4D95EA] rounded-lg hover:bg-[#2f86eb] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/login"
              className="text-lg text-blue-700 underline  hover:underline"
            >
              or Login
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

export default SingUp;