import Link from "next/link";

export default function App02Layout({children,}: {children: React.ReactNode;}) {
  return (
    <div className="h-full flex flex-col">
      <aside className="flex justify-between h-16 bg-gray-50 p-5">
        <h1 className="mb-5 text-xl font-bold">맛집 카테고리</h1>
        <nav>
          <ul className="flex">
            <li className="mb-2 mx-5"><Link href="/app02/junggu">중구</Link></li>
            <li className="mb-2 mx-5">동구</li>
            <li className="mb-2 mx-5">서구</li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}