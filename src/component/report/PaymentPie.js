import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PaymentPie = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Cơ cấu phương thức thanh toán
        </h3>
        <p className="text-gray-500">Không có dữ liệu hiển thị.</p>
      </div>
    );
  }

  const grouped = data.reduce((acc, item) => {
    const key = item.payment_method;
    acc[key] = (acc[key] || 0) + item.total_amount;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Cơ cấu phương thức thanh toán
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentPie;
