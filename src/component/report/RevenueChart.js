import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Xu hướng doanh thu
        </h3>
        <p className="text-gray-500">Không có dữ liệu hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Xu hướng doanh thu
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("vi-VN").format(value)
            }
          />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
            labelFormatter={(label) => `Thời gian: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#4f46e5"
            name="Doanh thu"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
