import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="w-full 2xl:flex justify-between hidden">
      <Link
        to={"/collection"}
        className="fixed-left fixed left-0 top-[200px] z-999"
      >
        <img
          className="w-[100px] rounded-xl"
          src="/images/bannernew.webp"
          alt=""
        />
      </Link>
      <Link
        to={"/collection"}
        className="fixed-right fixed right-0 top-[200px] z-999"
      >
        <img
          className="w-[100px] rounded-xl"
          src="/images/banner4.webp"
          alt=""
        />
      </Link>
    </div>
  );
}
export default Banner;
