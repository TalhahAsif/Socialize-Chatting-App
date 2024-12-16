import React from "react";
import Input from "../Component/Input";
import {
  Mail,
  MessageCircleDashed,
  RectangleEllipsis,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Signup = z.object({
  username: z
    .string()
    .min(3, { message: "Username should be longer then 3 characters" }),
  email: z.string().email({ message: "Enter A Valid Email" }),
  password: z
    .string()
    .min(8, { message: "Password should be longer then 8 character" }),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(Signup),
  });

  const onSubmit = (data) => {
    

    console.log(data);
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen md:w-1/2 flex flex-col gap-10 p-10 rounded-xl backdrop-blur-md bg-black/10"
      >
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-5xl font-bold">Register</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg font-bold">Socialize</p>
            <MessageCircleDashed size={50} color="#1e55ca" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <User />
            <input
              type="text"
              className="grow"
              placeholder={"username"}
              {...register("username")}
            />
          </label>
          {errors["username"] ? (
            <span className="text-red-600 text-xs">
              {errors["username"]?.message}
            </span>
          ) : null}
          <label className="input input-bordered flex items-center gap-2">
            <Mail />
            <input
              type="text"
              className="grow"
              placeholder={"email"}
              {...register("email")}
            />
          </label>
          {errors["email"] ? (
            <span className="text-red-600 text-xs">
              {errors["email"]?.message}
            </span>
          ) : null}

          <label className="input input-bordered flex items-center gap-2">
            <RectangleEllipsis />
            <input
              type="password"
              className="grow"
              placeholder={"password"}
              {...register("password")}
            />
          </label>
          {errors["password"] ? (
            <span className="text-red-600 text-xs">
              {errors["password"]?.message}
            </span>
          ) : null}
        </div>
        <div className="flex justify-center lg:justify-between items-end flex-wrap gap-4">
          <button className="btn btn-primary w-full lg:w-1/3">Register</button>
          <p className="">
            Already have Account?
            <Link to={"/auth/"} className="underline">
              login here
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Register;
