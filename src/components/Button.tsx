import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Button({ className, onClick, value, isPending }: any) {
  return (
    <>
      <div
        className={`flex justify-center bg-TERTIARY text-PRIMARY rounded-lg px-2.5 py-1.5 w-full hover:cursor-pointer hover:bg-TERTIARY/85 font-medium ${className}`}
        onClick={onClick}
      >
        {isPending ? (
          <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
        ) : (
          <input className="hover:cursor-pointer" type="button" value={value} />
        )}
      </div>
    </>
  );
}
