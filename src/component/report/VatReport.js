import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const VatReport = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("month");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");

  useEffect(() => {
    fetchData();
  }, [from, to, type]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/report/vat", {
        params: { from, to, type },
      });
      setData(res.data.data);
    } catch (err) {
      console.error("Error loading VAT report", err);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Báo cáo VAT (Thuế GTGT)</h3>
        <p className="text-gray-500">Không có dữ liệu VAT để hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Báo cáo VAT (Thuế GTGT)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
            labelFormatter={(label) => `Kỳ: ${label}`}
          />
          <Legend />
          <Bar dataKey="invoice_revenue" fill="#82ca9d" name="Doanh thu xuất hóa đơn" />
          <Bar dataKey="vat_output" fill="#8884d8" name="Thuế GTGT đầu ra (10%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VatReport;
