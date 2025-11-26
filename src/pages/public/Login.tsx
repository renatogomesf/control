import { FaEye, FaEyeSlash } from "react-icons/fa6";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigate()

  const login = async () => {
    const data = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      await axios
        .post("http://localhost:3000/login", data)
        .then((response) => {
          console.log(response.data);
          console.log(response.status);

          if(response.data){
            //navigation("/register")
          }
        })
        .catch((erro) => {
          console.log(erro.response.data);
          console.log(erro.status);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center rounded-3xl bg-white w-[500px] h-[500px] shadow-2xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl text-center font-bold mb-5">Login</h1>
          <div className="w-min flex flex-col gap-3">
            <div>
              <Input
                ref={emailRef}
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="flex items-center gap-2">
              <Input
                ref={passwordRef}
                className="w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
              />
              <div
                className="hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5.5 h-5.5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
          <Button className="my-5" onClick={login} value="Login"/>

          <p className="text-center">
            Ainda não possui conta?{" "}
            <Link className="underline" to={"/register"}>Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
