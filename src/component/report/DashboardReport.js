import React, { useEffect, useState } from "react";
import axios from "axios";
import RevenueChart from "./RevenueChart";
import AdminLayOut from "../adminLayOut"
import VatReport from "./VatReport";
import DiscountTable from "./DiscountReport";
import PaymentPie from "./PaymentPie";
const DashboardReport = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("");

  const [revenue, setRevenue] = useState([]);
  const [vat, setVAT] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [from, to, type]);

  const fetchReports = async () => {
    try {
      const [r, v, d, p] = await Promise.all([
        axios.get("http://localhost:3000/admin/report/revenue", { params: { from, to, type } }),
        axios.get("http://localhost:3000/admin/report/vat", { params: { from, to, type } }),
        axios.get("http://localhost:3000/admin/report/diCountMangerReport", { params: { from, to, type } }),
        axios.get("http://localhost:3000/admin/report/paymentMethod", { params: { from, to, type } }),
      ]);
          console.log("Revenue response:", r.data); // 👈 kiểm tra thực tế


      setRevenue(r.data.data);
      setVAT(v.data.data);
      setDiscounts(d.data.data);
      setPayments(p.data.data);
      
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu báo cáo", err);
    }
  };


  return (
    <>
    <AdminLayOut/>


    <div className="className="app sidebar-mini rtl style={{marginTop:40}}>

  <div className="app-content">
      <div className="flex gap-4 mb-6">
        <div>
          <strong>Từ</strong>
    <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border p-2" />
        </div>

        <div>
          <strong>Đến</strong>
 <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border p-2" />
        </div>
        
       
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2">
          <option value="day">Ngày </option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      <RevenueChart data={revenue} />
      <VatReport data={vat} />
      <DiscountTable data={discounts} />
      <PaymentPie data={payments} />
    </div>
    </div>

   
    </>
   
  );
};

export default DashboardReport;
