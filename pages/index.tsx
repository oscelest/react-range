import {Range} from "../src";
import {useState} from "react";

function IndexPage() {
  const [value, setValue] = useState(50);

  return (
    <div style={{display: "flex", gridRowGap: "10px", flexFlow: "column", width: "100%", height: "500px"}}>
      <Range onChange={onHorizontalValueChange} value={value} min={50} max={150}/>
      <Range onChange={onHorizontalValueChange} value={value} min={50} max={150}>
        <span>This is a horizontal range indicator</span>
      </Range>
      <Range onChange={onHorizontalValueChange} value={value} min={50} max={150} vertical={true}>
        <span>This is a vertical range indicator</span>
      </Range>
    </div>
  );

  function onHorizontalValueChange(value: number) {
    setValue(value);
  }
}

export default IndexPage;
