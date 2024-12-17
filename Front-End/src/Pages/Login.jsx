import React from "react";
import Input from "../Component/Input";
import {
  ActivityIcon,
  Mail,
  MessageCircleDashed,
  RectangleEllipsis,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Slices/usersSlice";

const loginschema = z.object({
  email: z.string().email({ message: "Enter A Valid Email" }),
  password: z.string().min(8, {
    message: "Password must contain atleast 8 character",
  }),
});

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  console.log("loading", loading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginschema),
  });

  const submitForm = (data) => {
    console.log(data);
    dispatch(loginUser(data));
    reset();
  };

  return (
    <section className="flex justify-center items-center h-screen mx-10">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-screen md:w-1/2 flex flex-col gap-10 p-10 rounded-xl backdrop-blur-md bg-black/10"
      >
        <div className="flex justify-between flex-wrap items-center">
          <p className="text-5xl font-bold">Login</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg font-bold">Socialize</p>
            <MessageCircleDashed size={50} color="#1e55ca" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <Mail />
            <input
              type={"text"}
              className="grow"
              placeholder={"Email"}
              {...register("email")}
            />
          </label>

          {errors ? (
            <span className="text-xs text-red-600">
              {errors["email"]?.message}
            </span>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <RectangleEllipsis />
            <input
              type={"password"}
              className="grow"
              placeholder={"Password"}
              {...register("password")}
            />
          </label>
          {errors ? (
            <span className="text-xs text-red-600">
              {errors["password"]?.message}
            </span>
          ) : null}
        </div>
        <div className="flex justify-center lg:justify-between items-end flex-wrap gap-4">
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary w-full lg:w-1/3"
          >
            Login
            {loading ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : null}
          </button>
          <p className="">
            Does not hove Account?
            <Link to={"/auth/register"} className="underline">
              create one
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
