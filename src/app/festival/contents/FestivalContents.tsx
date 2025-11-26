'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import TailButton from "@/components/TailButton";
import type { FestivalData } from "../Festival";

export default function FestivalContents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemString = searchParams.get('item');
  const contents : FestivalData | undefined = itemString ? JSON.parse(itemString) : undefined;
  const kakaoMapUrl = `https://map.kakao.com/link/map/${contents?.MAIN_PLACE.replace(',','').replace(' ','')},${contents?.LAT},${contents?.LNG}`;
  const [isExpanded, setIsExpanded] = useState(false); // 더보기, 접기 기능

  const handleHome = () => {
    router.push('/festival');
  }

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="w-full text-2xl font-bold p-5 mt-10 mb-5">{contents?.TITLE}</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full h-90 flex flex-col justify-start items-center overflow-hidden border rounded-2xl shadow-sm bg-white border-gray-200">
          <img className="rounded-2xl w-full h-full object-cover" src={contents?.MAIN_IMG_THUMB} />
        </div>
        <div className="md:col-span-2 border rounded-2xl shadow-sm bg-white border-gray-200 p-5">
          <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-2">
              <div className="p-2 md:text-right">축제구군</div>
              <div className="md:col-span-5 p-2">{contents?.GUGUN_NM}</div>
              <div className="p-2 md:text-right">주소</div>
              <div className="md:col-span-5 p-2 flex justify-start">
                <span>{contents?.ADDR1}</span>
                <div className="relative -top-1">
                  <a className="bg-[#FEE500] rounded-sm ml-2 flex justify-center items-center p-0.5 pr-2.5" href={kakaoMapUrl}>
                    <img src="/kakaomap3.png" alt="kakao"/>
                    <span className="text-[#000000] text-sm font-semibold">카카오맵</span>
                  </a>
                </div>
              </div>
              <div className="p-2 md:text-right">연락처</div>
              <div className="md:col-span-5 p-2">{contents?.CNTCT_TEL}</div>
              <div className="p-2 md:text-right">홈페이지 </div>
              {contents?.HOMEPAGE_URL ? (<a href={contents?.HOMEPAGE_URL} className="text-lg md:col-span-5 p-2 wrap-break-word">{contents?.HOMEPAGE_URL}</a>)
              : (<div className="md:col-span-5 p-2">{contents?.HOMEPAGE_URL}</div>)}
              <div className="p-2 md:text-right">상세내용 </div>
              <div className="md:col-span-5 p-2">
                {isExpanded || (contents?.ITEMCNTNTS.length ?? 0) <= 200 ? contents?.ITEMCNTNTS.replace(/^(\*\*.*)$/gm, '').replace(/<p[^>]*>[\s\S]*?<\/p>/g, '') :
                contents?.ITEMCNTNTS.replace(/^(\*\*.*)$/gm, '').replace(/<p[^>]*>[\s\S]*?<\/p>/g, '').slice(0, 200) + "..."}
                <div className="mt-1">
                  {(contents?.ITEMCNTNTS.length ?? 0) > 200 && <button className="underline hover:cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '접기' : '더보기'}</button>}
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="mt-5"><TailButton color='gray' caption='목록으로' onHandle={handleHome} /></div>
    </div>
  )
}
