import React, { forwardRef } from "react";

const DirectPayment = (_, ref) => {
  return (
    <div className="bg-[#edf6ff] pt-[40px] pb-[60px]" ref={ref}>
      <div className="2xl:w-4/5 2xl:mx-auto md:px-10 my-4 md:my-0 px-9">
        <div className="flex gap-x-6 items-center flex-col md:flex-row">
          <img
            src="/images/direct-payment.png"
            alt="Direct payment"
            className="h-[100px] object-contain"
          />

          <p className="text-[#6d8099] leading-8">
            Quý khách hàng có thể đến trực tiếp Showroom GEARVN tại Hà Nội và
            TP. Hồ Chí Minh để thanh toán bằng tiền mặt hoặc quẹt thẻ.
          </p>
        </div>

        <div className="mt-40 grid grid-cols-12 mx-auto gap-y-9 md:gap-x-9">
          <div className="col-span-12 md:col-span-6">
            <p className="text-[#253965] text-[18px] font-bold">
              Showroom Hoàng Hoa Thám - HCM
            </p>
            <p className="mt-2 text-[#3d4e5e] mb-4">
              78-80-82 Hoàng Hoa Thám, P. 12, Q. Tân Bình, TP. Hồ Chí Minh.
            </p>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.580717311688!2d106.64679670057737!3d10.798944965927792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294a0c97a181%3A0x6aece518177f9a92!2sGEARVN!5e0!3m2!1svi!2s!4v1599124589936!5m2!1svi!2s"
              className="w-full"
              height={260}
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex={0}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <p className="text-[#253965] text-[18px] font-bold">
              Showroom Kha Vạn Cân - Thủ Đức
            </p>
            <p className="mt-2 text-[#3d4e5e] mb-4">
              905 Kha Vạn Cân, Phường Linh Tây, Thành phố Thủ Đức
            </p>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.3714417177616!2d106.7568346768041!3d10.85932735765556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527dfdb9a969d%3A0x2733db35aa4da8ff!2zR2VhcnZuIDkwNSBLaGEgVuG6oW4gQ8Oibg!5e0!3m2!1svi!2sus!4v1673509619293!5m2!1svi!2sus"
              className="w-full"
              height={260}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <p className="text-[#253965] text-[18px] font-bold">
              Showroom Trần Hưng Đạo - HCM
            </p>
            <p className="mt-2 text-[#3d4e5e] mb-4">
              1081 - 1083 Trần Hưng Đạo, Phường 5, Quận 5, TP. Hồ Chí Minh.
            </p>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7554905596885!2d106.67153667680351!3d10.753318159615889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1af0e7aaa9%3A0x6f3b3d55ddbb4754!2zR0VBUlZOIFRy4bqnbiBIxrBuZyDEkOG6oW8!5e0!3m2!1svi!2s!4v1673508947219!5m2!1svi!2s"
              className="w-full"
              height={260}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <p className="text-[#253965] text-[18px] font-bold">
              Showroom Thái Hà - Hà Nội
            </p>
            <p className="mt-2 text-[#3d4e5e] mb-4">
              162 - 164 Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội
            </p>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.2500008827574!2d105.81924263902039!3d21.012670599004718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abd7a4041695%3A0xa594770e41494bdb!2sGearvn!5e0!3m2!1svi!2sus!4v1673509540233!5m2!1svi!2sus"
              className="w-full"
              height={260}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(DirectPayment);
