'use client';
import { useState, useEffect } from "react";
import { Restaurant } from "@/types/Restaurant";
import TailCard from "@/components/TailCard";

export default function BusanFoodPage() {
  const [tdata, setTdata] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async (pageNum: number) => {
    if(loading) return; // 더보기를 눌러서 로딩이 되는데 또 더보기를 누르면 return

    setLoading(true);
    try {
        const resp = await fetch(`/api/busanFood?page=${pageNum}`);
        if(!resp.ok) {
            throw new Error("맛집 정보를 불러오는데 실패했습니다.");
        }
        const { data, currentPage, totalPages } = await resp.json();
        setTdata(prev => [...prev, ...data]);
        if(currentPage >= totalPages) {
            setHasMore(false);
        }
    } catch(error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(()=> {
    fetchRestaurants(page);
  }, [page]);

  const handleLoadMore = () => {
    // 로딩 중이 아니고, 더 불러올 데이터가 있을 때만 페이지 번호를 증가
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
            <button onClick={handleLoadMore} className="w-80 bg-gray-300 p-1.5 rounded-full">맛집 더보기 ▾</button>
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