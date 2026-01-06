import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router";
import { useContext, useState, useTransition } from "react";
import { UserContext } from "../../context/UserContext";
import Toast from "../../components/Toast";
import type { ToastDTO } from "../../dtos/ToastDTO";

export default function Register() {
  const { register } = useContext(UserContext);

  const [isPending, startTransition] = useTransition();

  const [nameAlert, setNameAlert] = useState(false);
  const [lastNameAlert, setLastNameAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);

  const [controlToast, setControlToast] = useState<ToastDTO>();

  const submit = async (formData: any) => {
    const name = formData.get("name");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name) {
      setNameAlert(true);
    }

    if (!lastName) {
      setLastNameAlert(true);
    }

    if (!email) {
      setEmailAlert(true);
    }

    if (!password) {
      setPasswordAlert(true);
    }

    if (!name || !lastName || !email || !password) {
      return;
    }

    const data = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    };

    startTransition(async () => {
      await register(data).then((response) => {
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

        if (response === "Email already registered") {
          setControlToast({
            text: "Este e-mail já está em uso!",
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

        if (response === "Cadastro criado com sucesso!") {
          setControlToast({
            text: "Cadastro criado com sucesso!",
            showToast: true,
            type: 1,
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
    <div className="h-screen flex justify-center items-center text-TERTIARY overflow-auto">
      <Toast
        text={controlToast?.text}
        showToast={controlToast?.showToast}
        type={controlToast?.type}
      />
      <div className="flex justify-center items-center rounded-3xl bg-PRIMARY border border-QUATERNARY m-2 w-[400px]">
        <div className="flex flex-col gap-3 w-[85%]">
          <div className="my-5">
            <h1 className="text-xl font-bold">Cadastre-se</h1>
            <p className="font-extralight">
              Insira suas informações abaixo para criar sua conta.
            </p>
          </div>
          <form action={submit} className="flex flex-col gap-6">
            <div className="relative">
              <Input
                className={`w-full ${nameAlert ? "ring-3 ring-red-600" : ""}`}
                type="text"
                placeholder="Jhon"
                label="Nome"
                name="name"
                onFocus={() => setNameAlert(false)}
              />
              {nameAlert ? (
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
                  lastNameAlert ? "ring-3 ring-red-600" : ""
                }`}
                type="text"
                placeholder="Doe"
                label="Sobre nome"
                name="lastName"
                onFocus={() => setLastNameAlert(false)}
              />
              {lastNameAlert ? (
                <p className="absolute text-[0.7rem] mt-1 text-red-600">
                  Campo Obrigatório!
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="relative">
              <Input
                className={`w-full ${emailAlert ? "ring-3 ring-red-600" : ""}`}
                type="email"
                placeholder="email@exemplo.com"
                label="Email"
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
                type="password"
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
              className="mt-3"
              value="Cadastrar"
              type="submit"
              isPending={isPending}
            />
          </form>

          <Link className="underline text-center mb-5 font-extralight" to={"/"}>
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
