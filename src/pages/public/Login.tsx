import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigate();

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

          if (response.data) {
            navigation("/");
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
      <div className="flex justify-center items-center rounded-2xl bg-PRIMARY w-[400px] border border-QUATERNARY text-TERTIARY">
        <div className="flex flex-col gap-3 w-[85%]">
          <div className="my-5">
            <h1 className="text-xl font-bold">Login</h1>
            <p className="font-extralight">Insira seu e-mail abaixo para acessar sua conta.</p>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <Input
                ref={emailRef}
                type="email"
                placeholder="email@exemplo.com"
                label="Email"
                isPassword={false}
              />
            </div>

            <div className="flex items-center gap-2">
              <Input
                ref={passwordRef}
                type={"password"}
                label="Senha"
                isPassword={true}
              />
            </div>
          </div>
          <Button className="my-5" onClick={login} value="Login" />

          <p className="text-center mb-5 font-extralight">
            Ainda não possui conta?{" "}
            <Link className="underline" to={"/register"}>
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
