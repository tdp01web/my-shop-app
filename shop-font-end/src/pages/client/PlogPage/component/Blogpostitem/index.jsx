import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

const Blogpostitem = ({ blogItems }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "EEEE, dd/MM/yyyy", { locale: vi });
    } catch (error) {
      return "Ngày không hợp lệ";
    }
  };
  return (
    <>
      {blogItems.map((blog, index) => (
        <div key={index}>
          <div className="gap-4 grid grid-cols-12 mb-5">
            <div className="col-span-3">
              <img
                src={blog?.images[0]?.url || "/images/Blog/default.webp"}
                alt={blog.title}
                className="mb-2 rounded"
              />
            </div>
            <div className="col-span-9">
              <Link
                to={`/blog/${blog._id}`}
                className="font-semibold text-xs hover:text-red-500"
              >
                {blog.title}
              </Link>
              <p className="flex items-center pt-2 text-gray-500">
                <AccessTimeIcon className="mr-1" /> {blog.updatedAt || ""}
              </p>
            </div>
          </div>
          <hr className="mb-5" />
        </div>
      ))}
    </>
  );
};

export default Blogpostitem;
