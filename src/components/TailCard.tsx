import type React from "react";

interface TailCardProps {
  imgUrl : string,
  title : string,
  subtitle : string,
  tag : string
}
export default function TailCard({ imgUrl, title, subtitle, tag } : TailCardProps) {
  let tags : React.ReactElement | React.ReactElement[] | null = null ;
  if (tag.includes(",")) {
    let tm = tag.split(",");
    tags = tm.map((item, idx) => <span key={idx} className="bg-gray-200 rounded-full p-2 inline-flex m-1 text-xs ">#{item.trim()}</span>);
  }
  else if (tag) {
    tags = <span className="bg-gray-200 rounded-full p-2 inline-flex m-1 text-xs ">#{tag}</span>;
  }

  // console.log(tags);
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <div>
        <img className="rounded-t-lg w-full h-46 object-cover" src={imgUrl} />
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
  )
}
