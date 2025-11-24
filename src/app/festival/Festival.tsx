'use client'
import { useEffect, useState, useRef } from "react";
import TailCard from "@/components/TailCard";
import Link from "next/link";

export interface FestivalData { // 별도의 파일로도 만들 수 있음
  UC_SEQ : string,
  GUGUN_NM : string,
  MAIN_IMG_THUMB : string,
  MAIN_TITLE : string,
  SUBTITLE : string,
  PLACE : string,
  ADDR1 : string,
  CNTCT_TEL : string,
  HOMEPAGE_URL : string,
  ITEMCNTNTS : string,
  TITLE : string,
  LAT : number,
  LNG : number,
  MAIN_PLACE : string
}
export default function Festival() {
  const [data, setData] = useState<FestivalData[]>([]); // 초기값이 배열이면 제네릭으로 명시해줘야 함
  const [area, setArea] = useState<React.ReactElement[]>([]);
  const [areaFestival, setAreaFestival] = useState<FestivalData[]>([]);
  const selRef = useRef<HTMLSelectElement>(null); // ref 변수를 집어넣는 요소(여기선 select)를 타입으로 지정, ref는 초기값을 반드시 null로 잡아야 함

  const getFetchData = async () => {
    const api = process.env.NEXT_PUBLIC_API_KEY;
    const baseUrl = "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?";
    const url = `${baseUrl}serviceKey=${api}&pageNo=1&numOfRows=41&resultType=json`;

    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.getFestivalKr.item);
    setData(data.getFestivalKr.item);
  }

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    if(data.length == 0) return;

    let tm = data.map(item => item.GUGUN_NM);
    tm = [...new Set(tm)].sort(); // 중복 제거, 정렬
    let tmOp = tm.map(item => <option key={item} value={item}>{item}</option>)
    setArea(tmOp);
    // console.log(tm);
  }, [data]);

  const handleChange = () => {
    if(selRef.current?.value == "") {
      setAreaFestival([]);
    }

    let tm = data.filter(item => item.GUGUN_NM == selRef.current?.value);
    setAreaFestival(tm);
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <div className="w-9/10 flex flex-col justify-center items-center p-5">
        <h1 className="text-2xl font-bold p-4">부산 축제 정보 서비스✨</h1>
        <select className="w-1/3 bg-gray-100 border border-gray-200 rounded" onChange={handleChange} ref={selRef}>
          <option className="text-center" value="">=== 지역을 선택하세요. ===</option>
          {area}
        </select>
        <div className="mt-4 w-9/10 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areaFestival.map((item, idx) => <Link href={`/festival/contents?item=${encodeURIComponent(JSON.stringify(item))}`} key={item.UC_SEQ + idx}><TailCard key={item.UC_SEQ + idx} imgUrl={item.MAIN_IMG_THUMB} title={item.MAIN_TITLE.includes('(') ? item.MAIN_TITLE.split('(')[0].trim() : item.MAIN_TITLE.trim()} subtitle={item.SUBTITLE} tag={item.PLACE}/></Link>
          )}
        </div>
      </div>
    </div>
      
  )
}
