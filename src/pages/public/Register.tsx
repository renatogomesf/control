import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router";
import { useRef } from "react";
import axios from "axios";

export default function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigate();

  const register = async () => {
    const data = {
      name: nameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      await axios
        .post("http://localhost:3000/register", data)
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
      <div className="flex justify-center items-center rounded-3xl bg-white w-[500px] h-[500px] shadow-2xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl text-center font-bold mb-5">Cadastre-se</h1>
          <div className="flex flex-col gap-3">
            <Input ref={nameRef} placeholder="Nome" />
            <Input ref={lastNameRef} placeholder="Sobre nome" />
            <Input ref={emailRef} placeholder="Email" />
            <Input ref={passwordRef} placeholder="Senha" />
          </div>

          <Button className="mt-5" value="Cadastrar" onClick={register} />

          <Link className="underline text-center" to={"/"}>
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
