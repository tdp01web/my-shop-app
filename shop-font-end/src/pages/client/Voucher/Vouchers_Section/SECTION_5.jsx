const SECTION_5 = () => {
  return (
    <div
      id="ladi-image"
      style={{
        backgroundImage: `url('/images/voucher/nen_gach.webp'), linear-gradient(rgb(64, 138, 36), rgb(35, 99, 16))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center py-8 px-4">
        <div className="flex justify-center mb-8 w-full max-w-screen-lg">
          <img
            src="/images/voucher/sieu_sale_ngay_doi.webp"
            alt=""
            className="w-full max-w-[715px] h-auto"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-screen-lg mb-8 mx-auto">
          <img
            src="/images/voucher/untitled-1-12-20240829153201-7bshk.webp"
            alt=""
            className="transition-transform duration-300 ease-in-out transform hover:scale-105 w-full max-w-[382px] h-auto"
          />
          <img
            src="/images/voucher/untitled-1-13-20240829153201-b-tck.webp"
            alt=""
            className="transition-transform duration-300 ease-in-out transform hover:scale-105 w-full max-w-[382px] h-auto"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-screen-lg">
          <img
            src="/images/voucher/untitled-1-18-20240829153334-bjdfd.webp"
            alt=""
            className="transition-transform duration-300 ease-in-out transform hover:scale-105 w-full max-w-[763px] h-auto"
          />
          <img
            src="/images/voucher/untitled-1-19-20240829153334-mx6mn.webp"
            alt=""
            className="transition-transform duration-300 ease-in-out transform hover:scale-105 w-full max-w-[763px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SECTION_5;
