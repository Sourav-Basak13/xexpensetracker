import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import styles from "./BarChart.module.css";

function CustomBarChart({
  barChartConfig,
  barConfig,
  YAxisConfig,
  XAxisConfig,
  className,
}) {
  return (
    <ResponsiveContainer width={417} height={356} className={className}>
      <BarChart {...barChartConfig}>
        {/* <XAxis dataKey="name" axisLine={false} tickLine={false} /> */}
        <YAxis {...YAxisConfig} className={styles.bar_YAxis} />

        {/* XAxis for values */}
        <XAxis {...XAxisConfig} />
        <Bar {...barConfig} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CustomBarChart;
