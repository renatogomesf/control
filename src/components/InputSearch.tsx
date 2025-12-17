export default function InputSearch({ className, placeholder, onChange }: any) {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-3">
          <input
            className={`bg-SECONDARY rounded-lg px-2.5 py-1.5 outline-1 outline-QUATERNARY focus:ring-3 ring-QUATERNARY duration-300 ease-linear ${className}`}
            type="search"
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}
