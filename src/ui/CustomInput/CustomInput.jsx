import React from "react";
import styles from "./CustomInput.module.css";

const CustomInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default CustomInput;
