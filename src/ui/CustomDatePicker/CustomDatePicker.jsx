import React, { useState } from "react";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

function CustomDatePicker({ className, required }) {
  const [date, setDate] = useState(undefined);
  return (
    <Flatpickr
      className={className}
      data-enable-time
      placeholder="dd/mm/yyyy"
      value={date}
      onChange={([date]) => {
        setDate(date);
      }}
      options={{
        dateFormat: "d/m/Y",
      }}
      required={required}
    />
  );
}

export default CustomDatePicker;
