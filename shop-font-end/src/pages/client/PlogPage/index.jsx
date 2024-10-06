import React from "react";
import Title from "./component/title";
import Bannerblog
 from "./component/Bannerblog";
import Titlecontent from "./component/Titleconten";
const BlogPage = () => {
  return (
    <div className="relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <Title />
      <Bannerblog />
      <div className="w-full relative">
        <Titlecontent />
      </div>
    </div>
    
  );
};
export default BlogPage;
