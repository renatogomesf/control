import Input from "../../components/Input";
import Button from "../../components/Button";
import ControlSVG from "../../components/IconControl";
import { useRef, useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../context/UserContext";
import Toast from "../../components/Toast";

export default function Login() {
  const { login, isPending, controlToast } = useContext(UserContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const data = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    login(data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Toast
        text={controlToast?.text}
        showToast={controlToast?.showToast}
        type={controlToast?.type}
      />

      <div className="flex bg-TERTIARY rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-[300px]">
            <ControlSVG fill="#171717" className="w-10 h-10"/>
            <h1 className="text-center font-bold text-3xl">Control</h1>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-2xl bg-PRIMARY w-[400px] border border-QUATERNARY text-TERTIARY shadow-BACKGROUND shadow-lg">
          <div className="flex flex-col gap-3 w-[85%]">
            <div className="my-5">
              <h1 className="text-xl font-bold">Login</h1>
              <p className="font-extralight">
                Insira seu e-mail abaixo para acessar sua conta.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <Input
                  className="w-full"
                  ref={emailRef}
                  type="email"
                  placeholder="email@exemplo.com"
                  label="Email"
                  isPassword={false}
                />
              </div>

              <div className="flex items-center gap-2">
                <Input
                  className="w-full"
                  ref={passwordRef}
                  type={"password"}
                  label="Senha"
                  isPassword={true}
                />
              </div>
            </div>
            <Button
              className="my-5"
              onClick={() => submit()}
              value="Login"
              isPending={isPending}
            />

            <p className="text-center mb-5 font-extralight">
              Ainda não possui conta?{" "}
              <Link className="underline" to={"/register"}>
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
