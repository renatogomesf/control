export default function Input({ type, className, placeholder, ref }: any) {
  return (
    <>
      <input
        ref={ref}
        className={`bg-gray-100 rounded-2xl p-2.5 w-2xs focus:outline-1 ${className}`}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}
