export default function InputDate({
  type,
  className,
  label,
  name,
  onFocus,
  defaultValue,
}: any) {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium">{label}</label>
        <div className="flex items-center gap-3">
          <input
            className={`scheme-dark bg-SECONDARY rounded-lg px-2.5 py-1.5 outline-1 outline-QUATERNARY focus:ring-3 ring-QUATERNARY duration-300 ease-linear ${className}`}
            type={type}
            name={name}
            onFocus={onFocus}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    </>
  );
}
