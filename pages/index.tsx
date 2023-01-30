import {useState} from "react";
import {Range} from "../src";
import Style from "./index.module.css";

function IndexPage() {
  const [valueHorizontal, setValueHorizontal] = useState(25);
  const [valueVertical, setValueVertical] = useState(5);
  
  return (
    <div className={Style.Component}>
      <div className={Style.HorizontalList}>
        <Range className={Style.Horizontal} onChange={onHorizontalValueChange} value={valueHorizontal} min={0} max={50}/>
        <Range className={Style.Horizontal} onChange={onHorizontalValueChange} value={valueHorizontal} min={50} max={0}/>
      </div>
      <div className={Style.VerticalList}>
        <Range className={Style.Vertical} onChange={onVerticalValueChange} value={valueVertical} min={5} max={15} vertical={true}/>
        <Range className={Style.Vertical} onChange={onVerticalValueChange} value={valueVertical} min={15} max={5} vertical={true}/>
      </div>
    </div>
  );
  
  function onHorizontalValueChange(value: number) {
    setValueHorizontal(value);
  }
  function onVerticalValueChange(value: number) {
    setValueVertical(Math.round(value));
  }
}

export default IndexPage;
