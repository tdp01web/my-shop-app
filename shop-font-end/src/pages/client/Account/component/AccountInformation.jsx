import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const AccountInformation = () => {
  const [name, setName] = useState("Ph Y");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("*******");
  const [email, setEmail] = useState("gi*******@gmail.com");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const handleSaveChanges = () => {
    // Logic to handle saving changes
    console.log("Changes saved");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Thông tin tài khoản</h2>
      <div className="mb-4">
        <TextField
          fullWidth
          label="Họ Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
      </div>
      <div className="mb-4">
        <FormControl component="fieldset">
          <FormLabel component="legend">Giới tính</FormLabel>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="mb-4">
        <FormLabel component="legend">Số điện thoại</FormLabel>
        <div className="flex items-center">
          <span className="mr-2">********</span>
          <a href="#" className="text-blue-500">
            Thay đổi
          </a>
        </div>
      </div>
      <div className="mb-4">
        <FormLabel component="legend">Email</FormLabel>
        <div className="flex items-center">
          <span className="mr-2">gi*******@gmail.com</span>
          <a href="#" className="text-blue-500">
            Thay đổi
          </a>
        </div>
      </div>
      <div className="mb-4">
        <FormLabel component="legend">Ngày sinh</FormLabel>
        <div className="flex mt-2">
          <Select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            displayEmpty
            className="mr-2"
          >
            <MenuItem value="">
              <em>Ngày</em>
            </MenuItem>
            {/* Add options for days */}
          </Select>
          <Select
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            displayEmpty
            className="mr-2"
          >
            <MenuItem value="">
              <em>Tháng</em>
            </MenuItem>
            {/* Add options for months */}
          </Select>
          <Select
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Năm</em>
            </MenuItem>
            {/* Add options for years */}
          </Select>
        </div>
      </div>
      <Button
        onClick={handleSaveChanges}
        variant="contained"
        color="primary"
        fullWidth
      >
        LƯU THAY ĐỔI
      </Button>
    </div>
  );
};

export default AccountInformation;
