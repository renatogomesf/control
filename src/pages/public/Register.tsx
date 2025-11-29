import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const { register } = useContext(UserContext);

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
              placeholder="Jhon"
              label="Nome"
            />
            <Input
              className="w-full"
              ref={lastNameRef}
              placeholder="Doe"
              label="Sobre nome"
            />
            <Input
              className="w-full"
              ref={emailRef}
              placeholder="email@exemplo.com"
              label="Email"
            />
            <Input
              className="w-full"
              ref={passwordRef}
              label="Senha"
              type="password"
              isPassword={true}
            />
          </div>

          <Button className="mt-5" value="Cadastrar" onClick={() => submit()} />

          <Link
            className="underline text-center mb-5 font-extralight"
            to={"/login"}
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
