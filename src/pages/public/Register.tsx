import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center rounded-3xl bg-white w-[500px] h-[500px] shadow-2xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl text-center font-bold mb-5">Cadastre-se</h1>
          <div className="flex flex-col gap-3">
            <Input placeholder="Nome" />
            <Input placeholder="Sobre nome" />
            <Input placeholder="Email" />
            <Input placeholder="Senha" />
          </div>

          <Button className="mt-5" value="Cadastrar" />

          <Link className="underline text-center" to={"/"}>
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
