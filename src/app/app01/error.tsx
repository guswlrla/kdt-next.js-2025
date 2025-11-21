'use client';

export default function Error({ error, reset } : { error : Error, reset : () => void }) {
  return (
    <div>
      <h2 className="text-2xl text-red-500">에러 발생</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="bg-red-500 hover:bg-red-400 text-white rounded-sm p-3 mt-5">
        재시도
      </button>
    </div>
  );
}