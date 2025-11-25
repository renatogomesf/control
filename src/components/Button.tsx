export default function Button({ className, onClick, value }: any) {
  return (
    <>
      <input
        className={`bg-black text-white rounded-2xl p-2.5 w-2xs hover:cursor-pointer font-medium ${className}`}
        type="button"
        value={value}
        onClick={() => onClick()}
      />
    </>
  );
}
