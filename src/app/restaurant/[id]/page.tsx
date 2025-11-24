import RestaurantData from '@/data/부산맛집.json';
import Link from 'next/link';

interface RestaurantDetailProps {
    params : Promise<{id : string}>
}
export default async function RestaurantDetail({ params } : RestaurantDetailProps) {
  const { id } = await params;
  const restaurant = RestaurantData.find(item => item.UC_SEQ === Number(id));
  return (
    <div>
      {restaurant?.TITLE}
      {restaurant?.ADDR1}
      <Link href='/restaurant'>목록으로</Link>
    </div>
  );
}