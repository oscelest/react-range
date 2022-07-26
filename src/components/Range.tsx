import React, {useRef, ReactNode, CSSProperties} from "react";
import Style from "./Range.module.css";

function Range(props: RangeProps) {
  const {min = 0, max = 100, value = min, vertical = false, className, children, onChange, ...component_props} = props;
  const ref = useRef<HTMLDivElement>(null);

  const cursor_style = {} as CSSProperties;
  if (props.vertical) {
    cursor_style.top = `${(1 - value / max) * 100}%`;
  }
  else {
    cursor_style.left = `${value / max * 100}%`;
  }

  const classes = [Style.Component, "range"];
  if (props.className) classes.push(props.className);

  return (
    <div {...component_props} className={classes.join(" ")} data-vertical={vertical}>
      {!!children &&
        <div className={"range-label"}>
          {children}
        </div>
      }
      <div className={"range-bar"} ref={ref} onMouseDown={onBarMouseDown}>
        <div className={"range-cursor"} style={cursor_style}/>
      </div>
    </div>
  );

  function onBarMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
  }

  function onWindowMouseMove(event: MouseEvent) {
    updateValue(event);
  }

  function onWindowMouseUp(event: MouseEvent) {
    updateValue(event);
    window.removeEventListener("mousemove", onWindowMouseMove);
    window.removeEventListener("mouseup", onWindowMouseUp);
  }

  function updateValue(event: MouseEvent) {
    if (!ref.current) return;
    if (props.vertical) {
      const {top} = ref.current.getBoundingClientRect();
      const {scrollHeight, clientTop} = ref.current;
      const y = Math.max(0, Math.min(scrollHeight, event.pageY - top - clientTop));
      onChange?.((1 - y / scrollHeight) * max);
    }
    else {
      const {left} = ref.current.getBoundingClientRect();
      const {scrollWidth, clientLeft} = ref.current;
      const x = Math.max(0, Math.min(scrollWidth, event.pageX - left - clientLeft));
      onChange?.(x / scrollWidth * max);
    }
  }
}

export interface RangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  min?: number;
  max?: number;
  value?: number;
  vertical?: boolean;

  children?: ReactNode;

  onChange?(value: number): void;
}


export default Range;
