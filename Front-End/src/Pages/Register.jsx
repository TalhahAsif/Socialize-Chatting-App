import React from "react";
import Input from "../Component/Input";
import {
  Mail,
  MessageCircleDashed,
  RectangleEllipsis,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-screen md:w-1/2 flex flex-col gap-10 p-10 rounded-xl backdrop-blur-md bg-white/10">
        <div className="flex justify-between items-center">
          <p className="text-5xl font-bold">Register</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg font-bold">Socialize</p>
            <MessageCircleDashed size={50} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Input icon={<User />} type={"text"} placeholder={"Username"} />
          <Input icon={<Mail />} type={"email"} placeholder={"Email"} />
          <Input
            icon={<RectangleEllipsis />}
            type={"password"}
            placeholder={"Password"}
          />
        </div>
        <p>
          Already have account?{" "}
          <Link to={"/auth/"} className="underline">
            {" "}
            click here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
