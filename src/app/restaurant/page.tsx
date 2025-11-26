import restaurantData from '@/data/부산맛집.json';
import TailCard from '@/components/TailCard';
import type { Restaurant } from '@/types/Restaurant';

function cleanTag(tag : string) {
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

export default function RestaurantPage() {
  const totalData : Restaurant[] = restaurantData;
  return (
    <div className='w-full flex flex-col justify-start items-center px-4 md:px-8 lg:px-8'>
      <h2 className='text-xl font-bold text-center m-4'>부산 맛집 목록🍚</h2>
      <div className='w-full max-w-7xl mx-auto overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {totalData.map(item =>
        <TailCard key={item.UC_SEQ} imgUrl={item.MAIN_IMG_THUMB ?? ''} title={item.MAIN_TITLE} subtitle={item.GUGUN_NM} tag={cleanTag(item.RPRSNTV_MENU)} gubun="restaurant" seq={item.UC_SEQ}/>)}
      </div>    
    </div>
  );
}