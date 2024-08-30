function Banner() {
  return (
    <div className="w-full 2xl:flex justify-between fixed top-[200px] hidden z-[0]">
      <div className="fixed-left">
        <img
          className="w-[100px] rounded-xl"
          src="/public/images/banner3.webp"
          alt=""
        />
      </div>
      <div className="fixed-right">
        <img
          className="w-[100px] rounded-xl"
          src="/public/images/banner4.webp"
          alt=""
        />
      </div>
    </div>
  );
}
export default Banner;
