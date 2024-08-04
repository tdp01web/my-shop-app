import React from 'react'
import { Link } from 'react-router-dom'

const BannerSale = () => {
    return (
        <div className="grid grid-cols-1 p-2 sm:p-0 sm:grid-cols-2 gap-2 sm:gap-4 ">
            <Link to={""} class="relative overflow-hidden group">
                <img
                    src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/CT_4_610x295_1_68a96b0973.png"
                    alt=""
                    class="w-full object-cover transition-transform transform-gpu group-hover:scale-95 rounded-[60px]"
                />
            </Link>
            <Link to={""} class="relative overflow-hidden group">
                <img
                    src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/CT_4_610x295_2_82fbadfea0.png"
                    alt=""
                    class="w-full object-cover transition-transform transform-gpu group-hover:scale-95 rounded-[60px]"
                />
            </Link>
            <Link to={""} class="relative overflow-hidden group">
                <img
                    src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/MCT_4_375x146_1_7009f901fd.png"
                    alt=""
                    class="w-full object-cover transition-transform transform-gpu group-hover:scale-95 rounded-[60px]"
                />
            </Link>
            <Link to={""} class="relative overflow-hidden group">
                <img
                    src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/MCT_4_375x146_3_39ddf66203.png"
                    alt=""
                    class="w-full object-cover transition-transform transform-gpu group-hover:scale-95 rounded-[60px]"
                />
            </Link>
        </div>
    )
}

export default BannerSale