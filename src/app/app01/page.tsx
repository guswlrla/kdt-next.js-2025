import ErrorButton from "./ErrorButton";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return {name : '맛있는 파스타 집~!'}
}

export default async function App01Page() {
  const restaurant = await getData()
  return (
    <div className="w-full felx flex-col justify-start">
      <h1 className="text-2xl font-bold m-5">오늘의 맛집 추천</h1>
      <div className="flex flex-col w-70 border rounded-sm bg-gray-50 text-gray-700 p-5 ml-5">
        <h2 className="text-xl font-bold">{restaurant.name}</h2>
        <p>방금 추천받은 따끈따끈한 맛집!</p>
      </div>
      <ErrorButton />
    </div>
  );
}