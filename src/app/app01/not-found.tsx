import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold">파일오류</h2>
            <p>app01 폴더에 해당하는 파일이 존재하지 않습니다.</p>
            <Link href='/app01' className="bg-blue-500 text-white p-2 rounded-sm mt-3">맛집 목록으로 돌아가기</Link>
        </div>
    );
}