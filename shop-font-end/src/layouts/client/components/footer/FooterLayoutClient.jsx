import React from "react";
import FooterTop from "./component/FooterTop";
import FooterCopyright from "./component/FooterCopyright";
import { Divider } from "@mui/material";

const FooterLayoutClient = () => {
  return (
    <div className="w-full  bg-white">
      <FooterTop />
      <Divider style={{ width: "80%", margin: "0 auto" }} />
      <FooterCopyright />
    </div>
  );
};

export default FooterLayoutClient;
