import React, { useState } from "react";
import { Slider } from "@mui/material";

const ThresholdSlider = ({value, handleChange}) => {

  return (
    <Slider
      value={value}
      onChange={handleChange}
      step={0.5} // 0.5 단위
      min={0} // 최소값
      max={5} // 최대값
      marks // 마크 표시
      valueLabelDisplay="auto" // 값 라벨 표시
    />
  );
};

export default ThresholdSlider;
