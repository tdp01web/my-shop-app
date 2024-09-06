// SearchBar.jsx
import { Input } from "antd";
/* eslint-disable react/prop-types */
const SearchBar = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Tìm kiếm danh mục..."
      value={value}
      onChange={onChange}
      style={{ marginBottom: 16, width: 300 }}
    />
  );
};

export default SearchBar;
