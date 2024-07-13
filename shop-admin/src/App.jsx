import "./styles/App.css";
import { Button } from 'antd';

function App() {
  return (
    <>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
      <h1 className="text-3xl text-red-600 font-bold underline">
        admin
      </h1>
    </>
  );
}

export default App;
