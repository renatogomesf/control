export default function Select({ options, getSelectOption }: any) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <p className="text-nowrap">Filtrar por: </p>
        <select
          className="appearance-none outline-none bg-TERTIARY text-PRIMARY rounded-lg px-2.5 py-1.5 hover:cursor-pointer hover:bg-TERTIARY/85 font-medium pr-8"
          onChange={(e) => getSelectOption(e.target.value)}
        >
          {options.map((option: any, index: any) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>

      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-PRIMARY">
        ▼
      </span>
    </div>
  );
}
