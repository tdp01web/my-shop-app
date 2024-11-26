import React from "react";

import Blogpostitem from "../Blogpostitem";

const Titlecontent = ({ blogItems }) => {
  return (
    <>
      <div className="bg-white w-full mx-auto lg:p-4 mt-5 rounded-md relative mb-8 pt-12">
        <Blogpostitem blogItems={blogItems} />
      </div>
    </>
  );
};

export default Titlecontent;
