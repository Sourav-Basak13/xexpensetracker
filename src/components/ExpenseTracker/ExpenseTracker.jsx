import React, { useContext, useMemo } from "react";
import styles from "./ExpenseTracker.module.css";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import { TotalContext } from "../../context/TotalContext";

// const data = [
//   { name: "Entertainment", value: 2400 },
//   { name: "Food", value: 900 },
//   { name: "Travel", value: 500 },
// ];

const COLORS = ["#ff9304", "#a000ff", "#fde006"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      className={styles.pie_label}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ExpenseTracker() {
  const { _expenses } = useContext(TotalContext);

  const data = useMemo(() => {
    const count = {
      Entertainment: 0,
      Food: 0,
      Travel: 0,
    };
    _expenses[0].forEach((element) => {
      switch (element.category) {
        case "entertainment":
          count.Entertainment = count.Entertainment + element.price;
          break;
        case "food":
          count.Food = count.Food + element.price;
          break;
        case "travel":
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

  return (
    <div className={styles.expense_wrap}>
      <ExpenseCard key="income" text="Wallet Balance" type="income" />
      <ExpenseCard key="expense" text="Expenses" type="expense" />

      <ResponsiveContainer
        width={400}
        height={240}
        className={styles.responsive_container}
      >
        <PieChart width={199} height={199} className={styles.pie_chart}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
            nameKey="name"
            legendType="rect"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
            <Legend />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseTracker;
