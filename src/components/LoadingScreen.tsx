import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingScreen() {
  return (
    <>
      <div className="fixed top-0 left-0 bg-BACKGROUND h-screen w-screen z-10 text-TERTIARY">
        <div className="h-screen flex flex-col gap-3 items-center justify-center">
          <AiOutlineLoading3Quarters className="w-20 h-20 animate-spin" />
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    </>
  );
}
