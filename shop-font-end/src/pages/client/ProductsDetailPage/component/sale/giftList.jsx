/* eslint-disable react/prop-types */
function GiftList({ product }) {
  const { giftList } = product;
  return (
    <>
      <div className="hidden md:block border-b border-gray-300 mb-40"></div>
      <div className="mt-4">
        <p className="text-14 font-bold text-[#ff0000] mb-2 underline">
          Quà tặng:
        </p>
        <ul className="space-y-2">
          {giftList?.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              🎁
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default GiftList;
