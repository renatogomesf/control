import { FaRegCheckCircle, FaRegWindowClose } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import type { ToastDTO } from "../dtos/ToastDTO";

export default function Toast({ text, showToast, type }: ToastDTO) {
  return (
    <>
      <div
        className={`${
          showToast ? "fixed top-0" : "hidden"
        } bg-TERTIARY p-3 text-PRIMARY rounded-lg m-5 flex items-center justify-center gap-3 max-w-[300px] left-0 right-0 mx-auto z-30`}
      >
        {type == 1 ? (
          <FaRegCheckCircle className="w-10 h-10 fill-green-500" />
        ) : type == 2 ? (
          <FiAlertTriangle className="w-10 h-10 text-yellow-500" />
        ) : type == 3 ? (
          <FaRegWindowClose className="w-10 h-10 fill-red-500" />
        ) : (
          ""
        )}
        <p className="font-medium">{text}</p>
      </div>
    </>
  );
}
