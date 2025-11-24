import restaurantData from '@/data/부산맛집.json';
import TailCard from '@/components/TailCard';
import type { Restaurant } from '@/types/Restaurant';

// function cleanTag(tag : string) {
    // if(!tag) return tag;
    // let cleaned = tag.replace(/\([^)]*\)/g, '');
    // // 숫자, 원표시, - / , 등을 제거
    // cleaned = tag.replace(/[₩￦0-9\/-]+/g, '');
    // // 줄바꿈을 쉼표로 변환
    // cleaned = cleaned.replace(/\n+/g, ',');
    // // 메뉴명만 남기고 빈 항목 제거
    // const list = cleaned.split(',').map(item => item.trim()).filter(item => item.length > 0);
    // return list.join(',')
// }

export default function RestaurantPage() {
  const totalData : Restaurant[] = restaurantData;
  return (
    <div className='w-full flex flex-col justify-start items-center'>
      <h2 className='text-xl font-bold text-center m-4'>부산 맛집 목록</h2>
      <div className='w-full max-w-7xl mx-auto overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {totalData.map(item =>
        <TailCard key={item.UC_SEQ} imgUrl={item.MAIN_IMG_THUMB ?? ''} title={item.MAIN_TITLE} subtitle={item.GUGUN_NM} tag={item.RPRSNTV_MENU} gubun="restaurant" seq={item.UC_SEQ}/>)}
      </div>    
    </div>
  );
}