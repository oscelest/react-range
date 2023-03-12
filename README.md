# react-range

## Introduction

`react-range` is a minimalist [React](https://reactjs.org/) functional component which renders a range component.
The range takes a minimum, maximum, and current value, returning a value depending where the cursor is inside the range bar.
The component works unidirectionally with minimum and maximum being interchangeable.
It's minimalist in the sense that it contains only a few classes without being deeply nested elements nor containing many predefined and mandatory CSS properties.

## Installation

To install run the following command:

```shell
npm install @noxy/react-range@latest
```

Typescript types are already available in the library so no need to get external types.

## Usage

The following is an example of how to use the component:

```typescript jsx
import React, {HTMLProps, useState} from "react";
import {Range} from "@noxy/react-range";

function TestComponent(props: HTMLProps<HTMLDivElement>) {
  const [value, setValue] = useState<string>();
  
  return (
    <Range minimum={5} maximum={15} value={10} vertical={false} onChange={onChange}>
      <div {...props}>
        Hello World
      </div>
    </Range>
  );
  
  function onChange(value) {
    setValue(value);
  }
}
```

## Properties

The `Range` component inherits a combination of HTMLDivElement attributes and HTMLInputElement attributes
This includes the className property for those using CSS modules.

### minimum: number

The minimum value, the value on the right/bottom side of the range bar.

**Default value**: `0`

### maximum: number

The maximum value, the value on the left/top side of the range bar.

**Default value**: `1`

### value: number

The current value for the cursor.

**Default value**: Same as `minimum` value

### vertical: boolean

If the component should be displayed vertically or not.

**Default value**: `false`

## Event handlers

### onChange(value: number): void

A callback that is called whenever the range cursor is moved, returning the value of the position of the cursor.

## Styling

While the styling of this component is minimalist, the following section documents editable variables and properties which should not be edited.

### Important CSS Properties

The following are a list of properties which are designated as important.
To preserve component functionality, these should not be changed.
If you do need to change them however, please be advised that the component might stop working as intended.

```css
.range {
  position:    relative !important;
  user-select: none !important;
}

.range-cursor {
  position:         absolute !important;
  z-index:          100 !important;
  transform:        translate(-50%, -50%) !important;
}

.range[data-vertical="false"] .range-cursor {
  top:    50% !important;
}

.range[data-vertical="true"] .range-cursor {
  left:   50% !important;
}
```
