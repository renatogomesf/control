import { FaRegCheckCircle, FaRegWindowClose } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

export default function Toast({ text, showToast, type }: any) {
  return (
    <>
      <div
        className={
          `fixed bottom-0 ${showToast ? "right-0" : "-right-80"} bg-PRIMARY p-3 text-TERTIARY rounded-lg border border-QUATERNARY m-5 flex items-center gap-3 duration-300 ease-linear`
        }
      >
        {type == 1 ? (
          <FaRegCheckCircle className="w-10 h-10 fill-green-500" />
        ) : type == 2 ? (
          <FiAlertTriangle className="w-10 h-10 text-yellow-300" />
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
