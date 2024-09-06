import { useState } from "react";
import FooterLayoutClient from "../layouts/client/components/footer";
import HeaderLayoutClient from "../layouts/client/components/header";
import { Typography, Input, Button, Card, Layout, Form } from "antd";
import { Box } from "@mui/material";
import { FileSearchOutlined } from "@ant-design/icons";
import Banner from "../layouts/client/components/banner";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const NotFoundSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResult, setSearchResult] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      setErrorMessage("");
      setSearchResult(false);
    } else {
      setErrorMessage("Trường tìm kiếm không được để trống !");
      setSearchResult(false);
    }
  };

  const onFinish = () => {
    if (!inputValue) {
      setErrorMessage("Trường tìm kiếm không được để trống !");
      setSearchResult(false);
    } else {
      setErrorMessage("");
      setSearchResult(true);
      console.log("Thêm thành công", inputValue);
    }
  };

  return (
    <div className="bg-[#ECECEC] mx-auto max-w-screen-xl">
      <HeaderLayoutClient />
      <Banner />
      <Content className="p-4 sm:p-8 lg:p-12 text-center">
        <Card
          className="w-full max-w-screen-lg mx-auto p-4 sm:p-6 lg:p-8"
          bordered={false}
        >
          <Title className="text-2xl sm:text-3xl lg:text-2xl">TÌM KIẾM</Title>
          <div className="relative inline-block">
            <Box className="relative inline-block">
              <FileSearchOutlined className="text-[80px] sm:text-[100px] lg:text-[120px] text-gray-400" />
            </Box>
          </div>

          <div className="flex justify-center mt-4 sm:mt-5">
            <Form
              name="basic"
              className="flex flex-col sm:flex-row items-center"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item className="mb-2 sm:mb-0">
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full sm:w-[300px] lg:w-[400px] h-[40px] sm:h-[50px] border border-black align-middle"
                />
              </Form.Item>
              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-black border border-black w-full sm:w-[100px] h-[40px] sm:h-[50px] text-white align-middle mt-2 sm:mt-0 sm:ml-2"
                >
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </div>

          {errorMessage && (
            <Paragraph className="text-red-500 font-semibold text-[16px] sm:text-[18px] mt-4">
              {errorMessage}
            </Paragraph>
          )}

          {/* {searchResult && ( */}
          <>
            <Paragraph className="line-clamp-2 font-semibold text-[16px] sm:text-[18px] mt-4 sm:mt-6 lg:mt-7">
              Rất tiếc, chúng tôi không thể tìm thấy từ khóa của bạn.
            </Paragraph>
            <Paragraph className="line-clamp-2 font-semibold text-[16px] sm:text-[18px]">
              Vui lòng kiểm tra chính tả, sử dụng các từ khóa khác và thử lại!
            </Paragraph>
          </>
          {/* )} */}
        </Card>
      </Content>
      <FooterLayoutClient />
    </div>
  );
};

export default NotFoundSearch;
