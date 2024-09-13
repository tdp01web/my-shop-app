const SECTION_3 = () => {
  return (
    <div>
      <div
        id="ladi-image"
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/voucher/nen_gach.webp'), linear-gradient(rgb(64, 138, 36), rgb(35, 99, 16))`,
        }}
      >
        <div className="flex flex-col items-center py-8">
          <div className="flex justify-center items-center mb-4">
            <img
              src="/images/voucher/mua_sam_tha_ga.webp"
              alt=""
              className="w-full max-w-[715px] h-auto"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <img
              src="/images/voucher/daily50.webp"
              alt=""
              className="transition-transform duration-300 ease-in-out transform hover:scale-105 md:w-[382px] flex-1 pl-8 pr-8 md:pl-0 md:pr-0 h-auto"
            />
            <img
              src="/images/voucher/daily100.webp"
              alt=""
              className="transition-transform duration-300 ease-in-out transform hover:scale-105 md:w-[382px] flex-1 pl-8 pr-8 md:pl-0 md:pr-0 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SECTION_3;
