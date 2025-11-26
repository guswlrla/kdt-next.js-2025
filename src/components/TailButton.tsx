const BTStyle = {
    blue : {
      base : "bg-blue-600",
      hover : "hover:bg-blue-800"
    },
    orange : {
      base : "bg-orange-600",
      hover : "hover:bg-orange-800"
    },
    lime : {
      base : "bg-lime-600",
      hover : "hover:bg-lime-800"
    },
    gray : {
      base : "bg-gray-600",
      hover : "hover:bg-gray-700"
    },
    neutral : {
      base : "bg-neutral-800",
      hover : "hover:bg-neutral-900"
    }
};

type BtColor = keyof typeof BTStyle; // keyof는 type BtColor = 'blue' | 'orange' | 'lime' | 'gray' | 'neutral'와 같음
// typeof는 값을 타입으로 바꿈
// gray : {
//   base : string,
//   hover : string
// }

interface TailButtonProps {
  color : BtColor,
  caption : string,
  onHandle? : () => void
}
export default function TailButton({color, caption, onHandle} : TailButtonProps) {
  const btstyle = BTStyle[color];
  return (
    <button className={`${btstyle.base} text-white rounded ${btstyle.hover} px-4 py-2`}
            onClick={onHandle}> 
      {caption}
    </button>
  )
}
