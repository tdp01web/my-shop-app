import "./styles/App.css";
import { Button } from 'antd';
function App() {
  return (
    <>
      <h1 className="text-red-500">Con gà nam lùn</h1>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </>
  );
}

export default App;
