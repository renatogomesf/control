import Input from "../../components/Input";
import Button from "../../components/Button";
import ControlSVG from "../../components/IconControl";
import Toast from "../../components/Toast";
import { useContext, useState, useTransition } from "react";
import { Link } from "react-router";
import { UserContext } from "../../context/UserContext";
import type { ToastDTO } from "../../dtos/ToastDTO";

export default function Login() {
  const { login } = useContext(UserContext);

  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(true);

  const [emailAlert, setEmailAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);

  const [controlToast, setControlToast] = useState<ToastDTO>();

  const submit = async (formData: any) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      setEmailAlert(true);
    }

    if (!password) {
      setPasswordAlert(true);
    }

    if (!email || !password) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    startTransition(async () => {
      await login(data).then((response) => {
        if (response === "Incorrect email or password") {
          setControlToast({
            text: "E-mail ou senha incorretos",
            showToast: true,
            type: 2,
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response === "All fields are required") {
          setControlToast({
            text: "Preencha todos os campos!",
            showToast: true,
            type: 2,
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }

        if (response === "Internal Server Error") {
          setControlToast({
            text: "Erro interno no servidor!",
            showToast: true,
            type: 3,
          });

          setTimeout(() => {
            setControlToast({
              showToast: false,
            });
          }, 4000);
        }
      });
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Toast
        text={controlToast?.text}
        showToast={controlToast?.showToast}
        type={controlToast?.type}
      />

      <div
        className={` bg-PRIMARY/70 w-full h-full z-10 flex justify-center items-center ${
          isOpen ? "fixed" : "hidden"
        }`}
      >
        <div className="bg-PRIMARY p-5 border border-QUATERNARY text-TERTIARY rounded-lg max-w-[360px] flex flex-col gap-8">
          <div>
            <h1 className="text-xl font-bold">Que bom ter você aqui! :)</h1>
            <p className="font-extralight">Vamos começar!? 😀</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Fique a vontade para criar a sua própria conta clicando em
              "Cadastre-se" logo abaixo do botão para logar. Não precisa usar
              email real, <span className="font-bold">ainda</span> não
              verificamos se o email existe.
            </p>
            <p>
              <span className="font-bold text-red-600">OBS:</span> A api é
              hospedada no{" "}
              <a
                className="underline text-blue-400"
                href="https://render.com/"
                target="_blank"
              >
                Render
              </a>{" "}
              , logo, a primeira requisição (seja no login ou cadastro) demorará
              para executar a ação. Mas é só esperar um pouco que as próximas
              requisições voltam ao normal. :)
            </p>
          </div>
          <div>
            <Button
              className="mt-5"
              type="button"
              value="Vamos começar!"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
      <div className="flex bg-TERTIARY rounded-2xl m-2">
        <div className="flex flex-col items-center justify-center max-md:hidden">
          <div className="flex items-center justify-center w-[300px]">
            <ControlSVG fill="#171717" className="w-10 h-10" />
            <div className="flex flex-col">
              <h1 className="text-center font-bold text-3xl">Control</h1>
              <p className="-mt-2 text-end text-[0.8rem]">by RDEV</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-2xl md:w-[400px] bg-PRIMARY border border-QUATERNARY text-TERTIARY shadow-BACKGROUND shadow-lg">
          <div className="flex flex-col gap-3 w-[85%]">
            <div className="my-5">
              <h1 className="text-xl font-bold">Login</h1>
              <p className="font-extralight">
                Insira seu e-mail abaixo para acessar sua conta.
              </p>
            </div>
            <form action={submit} className="flex flex-col gap-6">
              <div className="relative">
                <Input
                  className={`w-full ${
                    emailAlert ? "ring-3 ring-red-600" : ""
                  }`}
                  type="email"
                  placeholder="email@exemplo.com"
                  label="Email"
                  isPassword={false}
                  name="email"
                  onFocus={() => setEmailAlert(false)}
                />
                {emailAlert ? (
                  <p className="absolute text-[0.7rem] mt-1 text-red-600">
                    Campo Obrigatório!
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="relative">
                <Input
                  className={`w-full ${
                    passwordAlert ? "ring-3 ring-red-600" : ""
                  }`}
                  type={"password"}
                  label="Senha"
                  isPassword={true}
                  name="password"
                  onFocus={() => setPasswordAlert(false)}
                />
                {passwordAlert ? (
                  <p className="absolute text-[0.7rem] mt-1 text-red-600">
                    Campo Obrigatório!
                  </p>
                ) : (
                  ""
                )}
              </div>

              <Button
                className="mt-5"
                value="Login"
                type="submit"
                isPending={isPending}
              />
            </form>

            <p className="text-center my-5 font-extralight">
              Ainda não possui conta?{" "}
              <Link className="underline" to={"/register"}>
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-TERTIARY">© RDEV 2025</p>
      </div>
    </div>
  );
}
