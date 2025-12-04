import RestaurantData from '@/data/부산맛집.json';
import Link from 'next/link';
import type { Restaurant } from '@/types/Restaurant';
import { notFound } from 'next/navigation';
import TailButton from '@/components/TailButton';

interface RestaurantDetailProps {
    params : Promise<{id : string}>
}

export async function generateStaticParams() {
  const restaurants: Restaurant[] = RestaurantData;
  return restaurants.map((restaurant) => ({
    id: String(restaurant.UC_SEQ),
  }));
}

export default async function RestaurantDetail({ params } : RestaurantDetailProps) {
  const { id } = await params;
  const restaurant = RestaurantData.find(item => item.UC_SEQ === Number(id));
  if(!restaurant) {
    notFound();
  }
  const kakaoMapUrl = `https://map.kakao.com/link/map/${restaurant?.ADDR1.replace(',','').replace(' ','')},${restaurant?.LAT},${restaurant?.LNG}`;
  return (
    <div className='max-w-4xl w-full h-auto flex flex-col items-start mt-4 mx-auto p-5'>
      <div>
        <h2 className='text-2xl font-bold'>{restaurant?.TITLE}</h2>
        <p className='text-gray-700'>{restaurant?.GUGUN_NM}</p>
      </div>
      <div className='rounded-lg mt-4 shadow bg-white border border-gray-200'>
        <img className='rounded-lg' src={restaurant?.MAIN_IMG_NORMAL ? restaurant?.MAIN_IMG_NORMAL : ""}/>
      </div>
      <div className='rounded-lg mt-4 shadow bg-white border border-gray-200'>
        <div className='p-5 grid grid-cols-2 gap-4'>
          <div className='border-b border-gray-300 pb-4 pl-2'>
            <p className='text-gray-700 mb-1'>주소</p>
            <div className="flex justify-start">
              {restaurant?.ADDR1.length >= 30 ? <span className='w-70'>{restaurant?.ADDR1}</span> : restaurant?.ADDR1}
              <a className="bg-[#FEE500] rounded-sm ml-2 flex justify-center items-center p-0.5 pr-2.5 relative -top-1 h-full" href={kakaoMapUrl} target='_blank'>
                <img src="/kakaomap3.png" alt="kakao"/>
                <span className="text-[#000000] text-sm font-semibold">카카오맵</span>
              </a>
            </div>
          </div>
          <div className='border-b border-gray-300 pb-4 pl-2'>
            <p className='text-gray-700 mb-1'>전화번호</p>
            <span>{restaurant?.CNTCT_TEL}</span>
          </div>
          <div className='border-b border-gray-300 pb-4 pl-2'>
            <p className='text-gray-700 mb-1'>대표메뉴</p>
            <span className="whitespace-pre-line">{restaurant?.RPRSNTV_MENU}</span>
          </div>
          <div className='border-b border-gray-300 pb-4 pl-2'>
            <p className='text-gray-700 mb-1'>운영시간</p>
            <span className="whitespace-pre-line">{restaurant?.USAGE_DAY_WEEK_AND_TIME}</span>
          </div>
        </div>
        <div className='pl-5 pb-5 pr-5'>
          <div className='border-t border-gray-300 pl-2 pt-2'>
            <p className='text-gray-700 mb-1'>홈페이지</p>
            {restaurant?.HOMEPAGE_URL ? <a href={restaurant?.HOMEPAGE_URL} className='underline'>{restaurant?.HOMEPAGE_URL}</a> : '-'}
          </div>
          <div className='mt-2 pl-2'>
            <p className='text-gray-700 mb-1'>상세내용</p>
            <span>{restaurant?.ITEMCNTNTS}</span>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center items-center p-5'>
        <Link href='/restaurant'>
          <TailButton color='gray' caption='목록으로' />
        </Link>
      </div>
    </div>
  );
}