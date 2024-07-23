import React from "react";
import MainHeader from "./component/MainHeader";
import SlideImages from "./component/SlideImages";
import SubHeader from "./component/SubHeader";
import { useBreakpoints } from "../../../../hooks/useBreakpoints";

const HeaderLayoutClient = () => {
  const { mobile, tablet } = useBreakpoints();
  return (
    <div>
      <SlideImages />
      <MainHeader />
      {!mobile && !tablet && <SubHeader />}
    </div>
  );
};

export default HeaderLayoutClient;
