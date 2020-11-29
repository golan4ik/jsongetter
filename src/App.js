import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox/InputBox";
import JsonGetter from "./components/JsonGetter/JsonGetter";

const App = () => {
  const [endPoint, setEndPoint] = useState("./mockData.json");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(null);

  return (
    <div className="App">
      <InputBox
        disable={isLoading}
        onApply={() => setUrl(endPoint)}
        onChange={setEndPoint}
        url={endPoint}
      />
      <JsonGetter url={url} onLoadStatusChange={setIsLoading} />
    </div>
  );
};

export default App;
