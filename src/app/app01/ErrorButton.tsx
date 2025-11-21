'use client';
import { useState } from "react";

export default function ErrorButton() {
  const [error , setError] = useState(false);
  if(error) {
    throw new Error("강제로 발생시킨 에러")
  }
  return (
    <div className="mt-5">
      <button className="bg-red-500 hover:bg-red-400 text-white rounded-sm p-3 ml-5" onClick={() => setError(true)}>
        에러발생시키기
      </button>
    </div>
  );
}