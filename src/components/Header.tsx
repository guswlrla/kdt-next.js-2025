'use client' // useState, useRef, useEffect 있는 컴포넌트는 use client를 써줘야 함
import Link from "next/link";
import { useAtomValue } from "jotai";
import { isLoginAtom } from "@/atoms/authAtom"; // src폴더 밑에 있는건 @로 처리

export default function Header() {
  const isLogin = useAtomValue(isLoginAtom);
  return (
    <header className='bg-gray-700 text-white shadow-md'>
      <nav className='container h-15 mx-auto flex justify-start items-center'>
        <div className='text-2xl font-bold text-gray-50'>Next.js</div>
        <ul className='flex space-x-3 text-gray-300 text-sm ml-5'>
          <li>
            <Link href='/'>홈</Link>
          </li>
          {isLogin && <>
          <li>|</li>
          <li>
            <Link href='/lotto'>로또</Link>
          </li>
          <li>|</li>
          <li>
            <Link href='/festival'>축제정보</Link>
          </li>
          <li>|</li>
          <li>
            <Link href='/todolist'>Todo</Link>
          </li>
          </>}
        </ul>
      </nav>
    </header>
  )
}
