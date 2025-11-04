import React, { use } from "react";
import { AtuhContext } from "../../contexts/AuthContext";

const Register = () => {
  const { signInWithGoogle } = use(AtuhContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // Create user in the mongodb databse
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after user save", data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, bg-primary, bg-secondary)",
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-primary mb-6">
          Create an Account
        </h1>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full input input-bordered border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end text-sm">
            <a className="text-secondary hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="h-px w-20 bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="h-px w-20 bg-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          className="relative w-full bg-white border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden group cursor-pointer"
          onClick={handleGoogleSignIn}
        >
          {/* Hover Gradient Accent Layer */}
          <div className="absolute inset-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          {/* Google Icon */}
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#EA4335"
              d="M256 8c68 0 129 24 177 64l-72 69c-30-28-69-45-105-45-85 0-155 69-155 155s70 155 155 155c98 0 135-70 141-107h-141v-86h236c3 14 5 28 5 44 0 128-85 219-241 219C118 476 8 365 8 228S118 8 256 8z"
            />
          </svg>

          {/* Text */}
          <span className="font-semibold text-gray-700 relative z-10 group-hover:text-primary transition-colors duration-300">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Register;
