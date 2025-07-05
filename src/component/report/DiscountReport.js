import React from "react";

const DiscountTable = ({ data }) => (
  <div className="bg-white rounded shadow p-4 overflow-x-auto">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Chiết khấu / Giảm giá</h3>
    <table className="min-w-full table-auto border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-left text-sm text-gray-600">
          <th className="p-3 border border-gray-200">Ngày</th>
          <th className="p-3 border border-gray-200">Đơn hàng</th>
          <th className="p-3 border border-gray-200">Giảm giá</th>
          <th className="p-3 border border-gray-200">Trước giảm</th>
          <th className="p-3 border border-gray-200">Sau giảm</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5" className="p-3 text-center text-gray-500">
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr
              key={row.ngay}
              className="hover:bg-gray-50 text-sm text-gray-700"
            >
              <td className="p-3 border border-gray-200">{row.ngay}</td>
              <td className="p-3 border border-gray-200">{row.tong_so_don_hang}</td>
              <td className="p-3 border border-gray-200">{Number(row.tong_giam_gia).toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{Number(row.tong_tien_truoc_khi_giam).toLocaleString()}</td>
              <td className="p-3 border border-gray-200">{Number(row.tong_tien_sau_khi_giam).toLocaleString()}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DiscountTable;