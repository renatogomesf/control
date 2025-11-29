export default function Button({ className, onClick, value }: any) {
  return (
    <>
      <input
        className={`bg-TERTIARY text-PRIMARY rounded-lg px-2.5 py-1.5 w-full hover:cursor-pointer hover:bg-TERTIARY/85 font-medium ${className}`}
        type="button"
        value={value}
        onClick={onClick}
      />
    </>
  );
}
