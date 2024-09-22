import React from 'react'
import Title from './component/Title';
import BannerBlog from './component/BannerBlog';
import Titlecontent from './component/Titlecontent';

const BlogPage = () => {
  return (
    <div className="relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <Title />
      <BannerBlog />
      <div className="mx-auto w-full">
        <Titlecontent />
        
      </div>
    </div>
  );
}
export default BlogPage;