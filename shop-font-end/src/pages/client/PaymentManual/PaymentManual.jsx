import { useRef } from "react";
import DirectPayment from "./DirectPayment";
import HeroSection from "./HeroSection";
import PaymentList from "./PaymentList";
import PaymentOnDelivery from "./PaymentOnDelivery";
import TransferPayment from "./TransferPayment";

const PaymentManual = () => {
  const paymentListRef = useRef(null);
  const transferPaymentRef = useRef();
  const directPaymentRef = useRef();
  const paymentOnDeliveryRef = useRef();

  const onScrollToPaymentList = () => {
    paymentListRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onScrollToTransferMethod = () => {
    transferPaymentRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onScrollToDirectMethod = () => {
    directPaymentRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onScrollToPaymentOnDelivery = () => {
    paymentOnDeliveryRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <HeroSection onScrollToPaymentList={onScrollToPaymentList} />
      <PaymentList
        ref={paymentListRef}
        onScrollToTransferMethod={onScrollToTransferMethod}
        onScrollToDirectMethod={onScrollToDirectMethod}
        onScrollToPaymentOnDelivery={onScrollToPaymentOnDelivery}
      />
      <TransferPayment ref={transferPaymentRef} />
      <DirectPayment ref={directPaymentRef} />
      <PaymentOnDelivery ref={paymentOnDeliveryRef} />
    </>
  );
};

export default PaymentManual;
