export default function InfoCard({ title, text, info }: any) {
  return (
    <>
      <div className="basis-[250px] grow bg-PRIMARY text-TERTIARY px-5 py-3 rounded-xl border border-QUATERNARY">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-[.9rem] font-extralight">{text}</p>
        <div className="text-xl font-bold mt-3">{info}</div>
      </div>
    </>
  );
}
