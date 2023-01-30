import React, {CSSProperties, HTMLProps, useRef} from "react";
import Style from "./Range.module.css";

export function Range(props: RangeProps) {
  const {min = 0, max = 100, value = min, vertical = false, className, children, ...component_method_props} = props;
  const {onChange, onMouseDown, ...component_props} = component_method_props;
  
  const ref = useRef<HTMLDivElement>(null);
  
  const lowest = Math.min(min, max);
  const highest = Math.max(min, max);
  const span = highest - lowest;
  const current = Math.min(Math.max(lowest, value), highest);
  const percentage = ((current - lowest) / span) * 100;
  
  const cursor_style = {} as CSSProperties;
  if (props.vertical) {
    cursor_style.top = `${(max >= min ? (100 - percentage) : percentage)}%`;
  }
  else {
    cursor_style.left = `${(max < min ? percentage : (100 - percentage))}%`;
  }
  
  const classes = [Style.Component, "range"];
  if (props.className) classes.push(props.className);
  
  return (
    <div {...component_props} ref={ref} className={classes.join(" ")} data-vertical={vertical} onMouseDown={onComponentMouseDown}>
      <div className={"range-cursor"} style={cursor_style}/>
    </div>
  );
  
  function onComponentMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    onMouseDown?.(event);
    if (event.defaultPrevented) return;
    
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
      const {top, height} = ref.current.getBoundingClientRect();
      const cursor_y = Math.min(Math.max(0, event.pageY - top), height);
      const percentage = cursor_y / height;
      const actual_percentage = max < min ? percentage : 1 - percentage;
      onChange?.(actual_percentage * span + lowest);
    }
    else {
      const {left, width} = ref.current.getBoundingClientRect();
      const cursor_x = Math.min(Math.max(0, event.pageX - left), width);
      const percentage = cursor_x / width;
      const actual_percentage = max >= min ? percentage : 1 - percentage;
      onChange?.(actual_percentage * span + lowest);
    }
  }
}

export interface RangeProps extends Omit<HTMLProps<HTMLDivElement>, "onChange"> {
  min?: number;
  max?: number;
  value?: number;
  vertical?: boolean;
  
  children?: never;
  
  onChange?(value: number): void;
}
