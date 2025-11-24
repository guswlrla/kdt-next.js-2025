import Link from "next/link";
import type React from "react";

interface TailCardProps {
  imgUrl : string,
  title : string,
  subtitle : string,
  tag : string, 
  gubun? : string,
  seq? : number
}
export default function TailCard({ imgUrl, title, subtitle, tag, gubun, seq  } : TailCardProps) {
  let tags : React.ReactElement | React.ReactElement[] | null = null ;
  if (tag.includes(",")) {
    let tm = tag.split(",");
    tags = tm.map((item, idx) => <span key={idx} className="bg-gray-200 rounded-full p-2 inline-flex m-1 text-xs ">#{item.trim()}</span>);
  }
  else if (tag) {
    tags = <span className="bg-gray-200 rounded-full p-2 inline-flex m-1 text-xs ">#{tag}</span>;
  }

  const cardContents = 
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
    <div>
      {imgUrl && <img className="rounded-t-lg w-full h-46 object-cover" alt={title} src={imgUrl} />}
    </div>
    <div className="flex flex-col justify-between p-4">
      <div>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h5>
        <p className="mb-3 text-sm text-gray-700">{subtitle}</p>
      </div>
    </div>
    <div className="mb-2 font-normal text-gray-700 p-2 flex flex-wrap gap-1 max-h-24 overflow-y-auto">
      {tags}
    </div>
  </div>
  return (
    gubun ? <Link href={`/restaurant/${seq}`}>{cardContents}</Link> : cardContents
  )
}
