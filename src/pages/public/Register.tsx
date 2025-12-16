import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import Toast from "../../components/Toast";

export default function Register() {
  const { register, isPending, controlToast } = useContext(UserContext);

  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const data = {
      name: nameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    register(data);
  };

  return (
    <div className="h-screen flex justify-center items-center text-TERTIARY">
      <Toast
        text={controlToast?.text}
        showToast={controlToast?.showToast}
        type={controlToast?.type}
      />
      <div className="flex justify-center items-center rounded-3xl bg-PRIMARY w-[400px] shadow-2xl">
        <div className="flex flex-col gap-3 w-[85%]">
          <div className="my-5">
            <h1 className="text-xl font-bold">Cadastre-se</h1>
            <p className="font-extralight">
              Insira suas informações abaixo para criar sua conta.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <Input
              className="w-full"
              ref={nameRef}
              type="text"
              placeholder="Jhon"
              label="Nome"
            />
            <Input
              className="w-full"
              type="text"
              ref={lastNameRef}
              placeholder="Doe"
              label="Sobre nome"
            />
            <Input
              className="w-full"
              type="email"
              ref={emailRef}
              placeholder="email@exemplo.com"
              label="Email"
            />
            <Input
              className="w-full"
              ref={passwordRef}
              type="password"
              label="Senha"
              isPassword={true}
            />
          </div>

          <Button
            className="mt-5"
            value="Cadastrar"
            onClick={() => submit()}
            isPending={isPending}
          />

          <Link
            className="underline text-center mb-5 font-extralight"
            to={"/"}
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
