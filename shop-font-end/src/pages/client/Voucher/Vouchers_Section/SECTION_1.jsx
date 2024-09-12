const SECTION_1 = () => {
  return (
    <div>
      <div
        id="ladi-image"
        style={{
          backgroundImage: `url('/images/voucher/banner_voucher.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div id="ladi-container" className="flex justify-center items-center">
          {/* image left */}
          <div id="ladi-element" className="ml-[-35px] hidden md:block">
            <div id="ladi-image">
              <div id="ladi-image-background">
                <img src="/images/voucher/ladi-image.webp" alt="" />
              </div>
            </div>
          </div>
          {/* image center*/}
          <div id="ladi-element" className="flex flex-col items-center mt-6">
            <div id="ladi-image" className="mb-4">
              <img
                src="/images/voucher/untitled-1-24-20240829152411-k0bzq.webp"
                alt="trạm voucher"
                className="w-full max-w-[995px] h-auto"
              />
            </div>
            <div id="ladi-image" className="flex justify-center mb-4">
              <img
                src="/images/voucher/x5_sale.webp"
                alt="x5 ưu đãi"
                className="md:w-[80%] w-[75%] h-auto"
              />
            </div>
            <div id="ladi-image" className="flex justify-center mb-4">
              <img
                src="/images/voucher/thanh_toan_0lai.webp"
                alt="thanh toán lãi 0"
                className="w-[86%] h-auto"
              />
            </div>
            <div id="ladi-image" className="flex justify-center mt-4 mb-9">
              <img
                src="/images/voucher/rinh_deal_ngay.webp"
                alt="rinh deal ngay"
                className="w-[80%] h-auto"
              />
            </div>
          </div>
          {/* image right */}
          <div id="ladi-element" className="hidden md:block">
            <div id="ladi-image">
              <div id="ladi-image-background">
                <img src="/images/voucher/ladi-image-right.webp" alt="" />s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SECTION_1;
