'use client';
import { useState, useEffect, useRef } from "react";
import { Restaurant } from "@/types/Restaurant";
import TailCard from "@/components/TailCard";
import { fetchRestaurants } from "./actions";

export default function BusanServerActionPage() {
  const [tdata, setTdata] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 컴포넌트가 마운트되었는지 확인하기 위한 ref
  const isMounted = useRef(false);

  // 서버 액션을 호출하여 맛집 데이터를 가져오는 함수
  const loadRestaurants = async (pageNum: number) => {
    if(loading && pageNum > 1) return;
    setLoading(true);

    const { data, currentPage, totalPages, error } = await fetchRestaurants(pageNum);

    if(error) {
      console.log("Failed to load restaurants: ", error);
      setLoading(false);
      return;
    }
    if(data.length > 0) {
      setTdata(prev => [...prev, ...data]);
    }
    if(currentPage >= totalPages) {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(()=> {
    if(isMounted.current || page === 1) {
      loadRestaurants(page);
    }
    if(!isMounted.current) {
      isMounted.current = true;
    }
  }, [page]);

  const handleLoadMore = () => {
    if(!loading && hasMore) {
        setPage(prevPage => prevPage + 1);
    }
  };

  function cleanTag(tag : string) {
    if (tag == null) return "";
    if(!tag) return tag;

    if(tag.includes('₩') || tag.includes('￦')) {
      return tag.split('\n').map(item => /\d인/.test(item) ? item.replace(/\([^)]*\)/g, '')
                                                                  .replace(/([₩￦]\s*\d[\d,]*)/g, '')
                                                                  .replace(/\/\s*\d[\d,]*/g, '').trim() :
                                                                  item.replace(/\([^)]*\)/g, '') // 괄호 안 내용 제거
                                                                      .replace(/[₩￦0-9,-\/\s]+/g, '').trim())  // 숫자, 화폐 /, 공백, 줄바꿈 제거)
                                                                      .join(',')
    }
    return tag;
  }

  return (
    <div className='w-full flex flex-col justify-start items-center px-4 md:px-8 lg:px-8'>
      <h2 className='text-xl font-bold text-center m-4'>부산 맛집 목록🍚</h2>
      <div className='w-full max-w-7xl mx-auto overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {tdata.map(item =>
        <TailCard key={item.UC_SEQ} imgUrl={item.MAIN_IMG_THUMB ?? ''} title={item.MAIN_TITLE} subtitle={item.GUGUN_NM} tag={cleanTag(item.RPRSNTV_MENU)} gubun="restaurant" seq={item.UC_SEQ}/>)}
      </div>
      {loading && (
        <div className="text-center my-4">
            <p>불러오는 중...</p>
        </div>
      )}
      {hasMore && !loading && (
        <div className="text-center my-8">
            <button onClick={handleLoadMore} className="w-50 bg-gray-400 p-1.5 rounded-full text-white">더보기 ▾</button>
        </div>
      )}
      {!hasMore && (
        <div className="text-center my-8">
            <p>더 이상 맛집이 없습니다.</p>
        </div>
      )}
    </div>
  );
}