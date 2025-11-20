interface TailSelectProps {
  id : string,
  selectLabel : string,
  optionKey : string[],
  optionVal : string[],
  ref : React.RefObject<HTMLSelectElement>,
  onHandle : () => void
}
export default function TailSelect({id, selectLabel, optionKey, optionVal, ref, onHandle} : TailSelectProps) {
    return (
      <div>
        <form className="max-w-sm mx-auto">
          <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{selectLabel}</label>
          <select id={id} ref={ref} onChange={onHandle} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            <option value="">{selectLabel} 선택</option>
            {optionKey && optionKey.map((item, idx) => <option key={item} value={item}>{optionVal[idx]}</option>)}
          </select>
        </form>
      </div>
    )
}
