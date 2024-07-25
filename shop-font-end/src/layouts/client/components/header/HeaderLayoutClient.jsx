import React from "react";
import MainHeader from "./component/MainHeader";
import SlideImages from "./component/SlideImages";
import SubHeader from "./component/SubHeader";
import { useBreakpoints } from "../../../../hooks/useBreakpoints";

const HeaderLayoutClient = () => {
  const { mobile, tablet, desktop, laptop } = useBreakpoints();
  return (
    <div>
      <SlideImages />
      <MainHeader />
      {(desktop || laptop) && <SubHeader />}
    </div>
  );
};
export default HeaderLayoutClient;
