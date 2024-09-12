const SECTION_4 = () => {
  return (
    <div>
      <div
        id="ladi-image"
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/voucher/nen_gach.webp'), linear-gradient(rgb(64, 138, 36), rgb(35, 99, 16))`,
        }}
      >
        <div className="flex flex-col items-center py-8 px-4">
          <div className="flex justify-center mb-6 w-full max-w-screen-lg">
            <img
              src="/images/voucher/untitled-1-14-20240801031750-kkjy5.webp"
              alt=""
              className="w-full max-w-[913px] h-auto"
            />
          </div>
          <div className="flex flex-wrap justify-between gap-4 ">
            <div className="flex-1 min-w-[300px] md:max-w-[457px]">
              <img
                src="/images/voucher/untitled-1-38-20240731093739-k-cym.webp"
                alt=""
                className="transition-transform duration-300 ease-in-out transform hover:scale-105 w-full h-auto"
              />
            </div>
            <div className="flex-1 min-w-[300px] md:max-w-[457px]">
              <img
                src="/images/voucher/untitled-1-15-20240731070219-4mv2l.webp"
                alt=""
                className="transition-transform duration-300 ease-in-out transform hover:scale-105 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SECTION_4;
