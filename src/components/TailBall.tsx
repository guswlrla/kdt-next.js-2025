const BALLColor = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500"
] as const; // 값을 바뀌지 않는 상수로 고정, readonly로 만듦

interface TailBallProps { // props의 타입을 정의할 땐, 인터페이스로
  n : number | undefined
}
export default function TailBall({n} : TailBallProps) {
  return (
    <div className={`w-20 h-20 ${n && BALLColor[Math.floor(n/10)]} rounded-full flex items-center justify-center text-white font-bold m-2`}>
      {n}
    </div>
  )
}
