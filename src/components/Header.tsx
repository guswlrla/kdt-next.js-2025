'use client' // useState, useRef, useEffect 있는 컴포넌트는 use client를 써줘야 함
import Link from "next/link";
import { useAtomValue } from "jotai";
import { isLoginAtom } from "@/atoms/authAtom"; // src폴더 밑에 있는건 @로 처리

export default function Header() {
  const isLogin = useAtomValue(isLoginAtom);
  return (
    <header className='bg-gray-700 text-white shadow-md'>
      <nav className='container h-15 mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold text-blue-50'>KDT03</div>
        <ul className='flex space-x-4'>
          <li>
            <Link href='/' className='hover:text-lg'>홈</Link>
          </li>
          {isLogin && <>
          <li>
            <Link href='/lotto' className='hover:text-lg'>로또</Link>
          </li>
          <li>
            <Link href='/festival' className='hover:text-lg'>축제정보</Link>
          </li>
          <li>
            <Link href='/todolist' className='hover:text-lg'>Todo</Link>
          </li>
          </>}
        </ul>
      </nav>
    </header>
  )
}
