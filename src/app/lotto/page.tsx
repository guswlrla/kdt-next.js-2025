'use client'
import TailButton from "@/components/TailButton";
import TailBall from "@/components/TailBall";
import { useState } from "react";

export default function Lotto() {
  const[tags, setTags] = useState<React.ReactElement[]>([]);

  const handleNum = () => {
    let nums : Set<number> = new Set([]); // 중복을 허용하지 않는 집합
    while(nums.size < 7) {
      let n = Math.floor(Math.random() * 45 + 1);
      nums.add(n); // 집합에서의 추가는 add()
    }
    
    let numsArr : number[] = Array.from(nums); // 배열로 변환
    let bonus = numsArr.pop()!;

    numsArr.sort((a, b) => a-b);
    // console.log(nums, bonus);

    let tm = numsArr.map(item => <TailBall n={item} key={item} />);
    tm = [...tm, <div className="w-20 h-20 flex justify-center items-center font-bold text-2xl" key="plus">+</div>]
    tm = [...tm, <TailBall n={bonus} key={bonus}/>]

    // console.log(tm);
    setTags(tm);
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center h-25">
        {tags}
      </div>
      <div className="mt-5">
        <TailButton caption="로또번호생성" color="blue" onHandle={handleNum}/>
      </div>
    </div>
  )
}