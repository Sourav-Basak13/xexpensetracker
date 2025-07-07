import React, { useCallback, useContext, useMemo } from "react";
import styles from "./TopExpenses.module.css";
import CustomBarChart from "../../ui/BarChart/BarChart";
import { TotalContext } from "../../context/TotalContext";
import useDimension from "../../hooks/general/useDimension";

const getRoundedRightPath = (x, y, width, height, radius = height / 2) => {
  // Prevent rendering when width or height is 0
  if (width <= 0 || height <= 0) return "";

  // Prevent radius from exceeding half the width
  const effectiveRadius = Math.min(radius, width / 2);

  const right = x + width;

  return `
    M${x},${y}
    H${right - effectiveRadius}
    A${effectiveRadius},${effectiveRadius} 0 0 1 ${right},${y + height / 2}
    A${effectiveRadius},${effectiveRadius} 0 0 1 ${right - effectiveRadius},${
    y + height
  }
    H${x}
    Z
  `;
};

const RoundedRightBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getRoundedRightPath(x, y, width, height)} fill={fill} />;
};

function TopExpenses() {
  const { _expenses } = useContext(TotalContext);
  const { width } = useDimension();

  const data = useMemo(() => {
    const count = {
      Entertainment: 0,
      Food: 0,
      Travel: 0,
    };
    _expenses[0].forEach((element) => {
      switch (element.category) {
        case "Entertainment":
          count.Entertainment = count.Entertainment + element.price;
          break;
        case "Food":
          count.Food = count.Food + element.price;
          break;
        case "Travel":
          count.Travel = count.Travel + element.price;
          break;
      }
    });
    return Object.entries(count).map(([key, value]) => {
      return {
        name: key,
        value,
      };
    });
  }, [_expenses[0]]);

  const getWidth = useCallback(() => {
    if (width <= 599) return 110;
    else if (width <= 768) return 65;
    else return 110;
  }, [width]);

  return (
    <CustomBarChart
      className={styles.top_expenses_wrapper}
      barChartConfig={{
        width: 150,
        height: 40,
        data,
        layout: "vertical",
        barCategoryGap: 40,
      }}
      YAxisConfig={{
        type: "category",
        dataKey: "name",
        axisLine: false,
        tickLine: false,
        width: getWidth(),
      }}
      XAxisConfig={{
        type: "number",
        hide: true,
      }}
      barConfig={{
        dataKey: "value",
        fill: "#8884d8",
        layout: "vertical",
        barSize: 30,
        shape: <RoundedRightBar />,
      }}
    />
  );
}

export default TopExpenses;
