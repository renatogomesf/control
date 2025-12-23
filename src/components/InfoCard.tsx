export default function InfoCard({ title, text, info, className }: any) {
  return (
    <>
      <div
        className={`max-sm:min-w-[280px] basis-60 grow flex flex-col justify-between bg-PRIMARY text-TERTIARY px-5 py-3 rounded-xl border border-QUATERNARY ${className}`}
      >
        <div>
          <p className="text-xl font-bold text-nowrap">{title}</p>
          <p className="text-[.9rem] font-extralight">{text}</p>
        </div>
        <div className="text-xl font-bold mt-3">{info}</div>
      </div>
    </>
  );
}
