import Button from "./Button";

export default function Dialog({
  action,
  isPending,
  showDialog,
  setShowDialog,
  idToDelete,
  itemToDelete,
  table,
}: any) {
  const showItem = () => {
    if (table === "goal") {
      return (
        <div className="flex flex-col gap-3">
          <p>
            <span className="font-bold">Meta:</span> {itemToDelete.goal}
          </p>

          <p>
            <span className="font-bold">Valor atual:</span> R${" "}
            {itemToDelete.currentValue?.toLocaleString()}
          </p>

          <p>
            <span className="font-bold">Valor total:</span> R${" "}
            {itemToDelete.totalValue?.toLocaleString()}
          </p>
        </div>
      );
    }

    if (table === "revenue" || table === "expense") {
      return (
        <div className="flex flex-col gap-3">
          <p>
            <span className="font-bold">
              {table === "revenue"
                ? "Quando recebeu:"
                : table === "expense"
                ? "Quando gastou:"
                : ""}{" "}
            </span>{" "}
            {new Date(itemToDelete.date).getUTCDate() < 10
              ? `0${new Date(itemToDelete.date).getUTCDate()}`
              : new Date(itemToDelete.date).getUTCDate()}
            /
            {new Date(itemToDelete.date).getUTCMonth() + 1 < 10
              ? `0${new Date(itemToDelete.date).getUTCMonth() + 1}`
              : new Date(itemToDelete.date).getUTCMonth() + 1}
            /{new Date(itemToDelete.date).getUTCFullYear()}
          </p>

          <p>
            <span className="font-bold">Descrição:</span>{" "}
            {itemToDelete.description}
          </p>

          <p>
            <span className="font-bold">Valor:</span> R${" "}
            {itemToDelete.value?.toLocaleString()}
          </p>
        </div>
      );
    }

    if (table === "amountToReceive" || table === "amountToPay") {
      return (
        <div className="flex flex-col gap-3">
          <p>
            <span className="font-bold">
              {table === "amountToReceive"
                ? "Quando receberá:"
                : table === "amountToPay"
                ? "Quando pagará:"
                : ""}{" "}
            </span>{" "}
            {new Date(itemToDelete.date).getUTCDate() < 10
              ? `0${new Date(itemToDelete.date).getUTCDate()}`
              : new Date(itemToDelete.date).getUTCDate()}
            /
            {new Date(itemToDelete.date).getUTCMonth() + 1 < 10
              ? `0${new Date(itemToDelete.date).getUTCMonth() + 1}`
              : new Date(itemToDelete.date).getUTCMonth() + 1}
            /{new Date(itemToDelete.date).getUTCFullYear()}
          </p>

          <p>
            <span className="font-bold">Nome:</span> {itemToDelete.name}
          </p>

          <p>
            <span className="font-bold">Descrição:</span>{" "}
            {itemToDelete.description}
          </p>

          <p>
            <span className="font-bold">Valor:</span> R${" "}
            {itemToDelete.value?.toLocaleString()}
          </p>
        </div>
      );
    }
  };
  return (
    <>
      <div
        className={`flex justify-center items-center w-full h-full top-0 left-0 z-10 bg-PRIMARY/70 px-3 ${
          showDialog ? "fixed" : "hidden"
        }`}
      >
        <div className="text-TERTIARY bg-PRIMARY border border-QUATERNARY p-3 max-w-[400px] rounded-lg">
          <h1 className="text-xl font-bold">Deletar</h1>
          <p className="mb-5">Deseja realmente deletar este item?</p>

          <div className="my-5 bg-BACKGROUND p-2 rounded-lg">{showItem()}</div>

          <div className="flex justify-end gap-3">
            <Button
              className="text-TERTIARY bg-[#0a0a0b] max-w-[100px] hover:bg-[#0a0a0b]/60"
              value="cancelar"
              type="button"
              onClick={() => setShowDialog(false)}
            />
            <Button
              className="max-w-[100px]"
              value="confirmar"
              type="button"
              isPending={isPending}
              onClick={() => action(idToDelete)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
