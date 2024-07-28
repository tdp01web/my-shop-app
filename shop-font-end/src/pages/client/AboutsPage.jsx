import React from 'react'

const AboutsPage = () => {
  return (
    <>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="w-full">
          <h1 className="w-full text-center font-bold text-red-600 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2 ">Giới thiệu Gearvn</h1>
          <p className="font-normal text-base leading-6 text-black mt-6">Khách hàng hôm nay là đồng đội tương lai! Chúng ta cùng nhau lan toả giá trị tích cực đến cộng đồng game thủ và tất cả những người yêu công nghệ tại Việt Nam</p>
        </div>

        <div className="lg:mt-14 sm:mt-10 mt-12">
          <img className=" md:h-[500px] h-[300px] object-cover w-full rounded-md" src="https://thanhnien.mediacdn.vn/Uploaded/baont/2021_12_29/gearvn-kvc-1-8055.jpg" alt="Group of people Chilling" />
        </div>

        <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
          <div className="w-full xl:w-5/12 lg:w-6/12">
            <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 my-2 text-red-600">Về chúng tôi</h2>
            <p className="font-normal text-base leading-6 text-black mt-6">GearVN là thương hiệu được sinh ra từ giấc mơ của một game thủ, phát triển bởi tập thể các game thủ để phục vụ cho cộng đồng game thủ Việt.</p>
            <p className="font-normal text-base leading-6 text-black mt-6">Đội ngũ tư vấn của GearVN không đơn thuần là nhân viên kinh doanh, chúng tôi còn là những người yêu game với mong muốn giúp bạn cùng sở thích có được dàn máy và gear phù hợp.</p>
            <p className="font-normal text-base leading-6 text-black mt-6">Sự hài lòng của khách hàng chính là động lực giúp GearVN không ngừng hoàn thiện, mang lại ngày càng nhiều giá trị tích cực cho cộng đồng.</p>
          </div>
          <div className="lg:flex items-center w-full lg:w-1/2 ">
            <img className="lg:block w-full object-cover w-full rounded-md" src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/356662508_266414546069571_2404233093151306531_n.png?stp=dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFqGkE3PuXh7sp2cEnstshxveoYTKH2kI296hhMofaQjUmL7_kRKI4y1m3rwgUc6-82gd10HWBLsh4WJHTIum8c&_nc_ohc=PEwYCybc6EUQ7kNvgEydnGU&_nc_ht=scontent.fhan17-1.fna&oh=00_AYB6_GQffmZdDYjYjvEnyZbe-2QTn6LDR0o_7E2PszgPrw&oe=66AB95A6 " alt="people discussing on board" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-5">
          <div className="w-full">
            <img src="https://photo2.tinhte.vn/data/attachment-files/2021/12/5797555_cover_gearvn_kha-van-can.jpg" alt="Large Image" className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 w-full gap-4 ">
            <div className="col-span-1">
              <img src="https://thanhnien.mediacdn.vn/Uploaded/baont/2021_12_29/gearvn-kvc-10-9196.jpg" alt="Image 1" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="col-span-1">
              <img src="https://genk.mediacdn.vn/2018/1/26/dscf9268-1516958199620758011120.jpg" alt="Image 2" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="col-span-1">
              <img src="https://thanhnien.mediacdn.vn/Uploaded/baont/2021_12_29/gearvn-kvc-5-6335.jpg" alt="Image 3" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="col-span-1">
              <img src="https://i0.wp.com/d9n64ieh9hz8y.cloudfront.net/wp-content/uploads/20211229120104/khai-truong-showroom-gearvn-kha-van-can-tai-thanh-pho-thu-duc-su-kien-1-1140x760.jpg?resize=1140%2C760&ssl=1" alt="Image 4" className="w-full h-full object-cover rounded-md" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="w-full text-center font-bold text-red-600 lg:text-4xl text-3xl lg:leading-10 mt-2 ">Trải nghiệm mua sắm toàn diện</h2>
          <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
            <div className="w-full xl:w-5/12 lg:w-6/12">
              <h2 className="font-bold text-2xl lg:leading-9 leading-7 text-black text-center">Hệ thống Showroom</h2>
              <img src="./public/images/download.png" alt="" />
              <h3 className="font-bold text-xl lg:leading-9 leading-7 text-gray-700">Miền Bắc</h3>
              <ul className=" list-disc font-light text-16 lg:leading-9 leading-7 mx-7 text-red-500">
                <li>Showroom GearVn Thái Hà</li>
              </ul>
              <h3 className="font-bold text-xl lg:leading-9 leading-7 text-gray-700">Miền Nam</h3>
              <ul className=" list-disc font-light text-16 lg:leading-9 leading-7 mx-7 text-red-500">
                <li>Showroom GearVn Hoàng Hoa Thám</li>
                <li>Showroom GearVn Kha Vạn Cân</li>
              </ul>
            </div>
            <div className="w-full xl:w-5/12 lg:w-6/12">
              <h2 className="font-bold text-xl lg:leading-9 leading-7 text-black text-center">Mua sắm trực tiếp</h2>
              <img src="./public/images/download2.png" alt="" />
              <h3 className="font-bold text-xl lg:leading-9 leading-7 text-gray-700">Website GearVn</h3>
              <ul className="list-disc font-light text-16 lg:leading-9 leading-7 mx-7 text-red-500">
                <li>www.gearvn.com</li>
                <li>Miễn phí giao hàng toàn quốc</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default AboutsPage