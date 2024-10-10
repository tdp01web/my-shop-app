function Banner() {
  return (
    <div className="w-full 2xl:flex justify-between hidden">
      <div className="fixed-left fixed left-0 top-[200px] z-999">
        <img
          className="w-[100px] rounded-xl"
          src="/images/banner3.webp"
          alt=""
        />
      </div>
      <div className="fixed-right fixed right-0 top-[200px] z-999">
        <img
          className="w-[100px] rounded-xl"
          src="/images/banner4.webp"
          alt=""
        />
      </div>
    </div>
  );
}
export default Banner;
