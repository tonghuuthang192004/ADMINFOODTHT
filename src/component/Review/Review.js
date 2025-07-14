import React, { useEffect, useState } from 'react';
import Clock from '../clock';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaEye, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { getReviews } from '../../api/api';
import AdminLayOut from '../adminLayOut';

function ReviewList() {
  const [reviews, setReviews] = useState([]); // Changed from products to reviews
  const [loading, setLoading] = useState(true);
  const [selectedReviews, setSelectedReviews] = useState([]);

  const [bulkAction, setBulkAction] = useState('active');
  const [message, setMessage] = useState('');

  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 1,
  });

  // Fetching reviews according to filters
  useEffect(() => {
    setLoading(true);
    getReviews(filters)
      .then((data) => {
        setReviews(data);
        setLoading(false);
        setSelectedReviews([]); // Reset selected reviews when filters change
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      });
  }, [filters]);

  // Handle status change for individual review
  const handleStatus = async (id, status) => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    try {
      const response = await fetch(
        `http://localhost:3000/admin/review/change-status/${newStatus}/${id}`,
        { method: 'PUT' }
      );
      const data = await response.json();
      if (data.success) {
        setFilters((prev) => ({ ...prev })); // Reload the reviews list
      }
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  // Select all reviews
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = reviews.map((r) => r.id_danh_gia); // assuming id_danh_gia is review's ID
      setSelectedReviews(allIds);
    } else {
      setSelectedReviews([]);
    }
  };

  // Select individual review
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedReviews((prev) => [...prev, id]);
    } else {
      setSelectedReviews((prev) => prev.filter((pid) => pid !== id));
    }
  };

  // Bulk action for selected reviews
  const handleBulkAction = async () => {
    if (selectedReviews.length === 0) {
      setMessage('Please select at least one review');
      return;
    }

    if (bulkAction === 'delete') {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'The selected reviews will be moved to the trash.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        try {
          const res = await fetch('http://localhost:3000/admin/review/delete-multiple', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: selectedReviews }),
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire('Deleted!', `Deleted ${selectedReviews.length} reviews.`, 'success');
            setSelectedReviews([]);
            setFilters((prev) => ({ ...prev }));
          } else {
            Swal.fire('Error!', data.error || 'Deletion failed.', 'error');
          }
        } catch (error) {
          console.error(error);
          Swal.fire('Error!', 'Error occurred while deleting reviews.', 'error');
        }
      }
    } else {
      try {
        const res = await fetch('http://localhost:3000/admin/review/change-multi', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedReviews, status: bulkAction }),
        });
        const data = await res.json();
        if (data.success) {
          setMessage(`Successfully updated the status of ${selectedReviews.length} reviews`);
          setSelectedReviews([]);
          setFilters((prev) => ({ ...prev }));
        } else {
          setMessage(data.error || 'Bulk update failed');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error occurred during bulk update');
      }
    }
  };

  if (loading) return <p>Loading data...</p>;

  // Handle soft delete for individual review
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'The review will be moved to the trash.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/admin/review/deleted/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire('Deleted!', 'The review has been deleted.', 'success');
          setFilters((prev) => ({ ...prev })); // Reload reviews list
        } else {
          Swal.fire('Error!', data.message || 'Failed to delete the review.', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'An error occurred while deleting the review.', 'error');
      }
    }
  };

  return (
    <>
      <AdminLayOut />
      <div className="app sidebar-mini rtl">
        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#">
                  <b>Danh sách Đánh Giá</b>
                </a>
              </li>
            </ul>
            <div id="clock">
              <Clock />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                <div className="tile-body">
                  <div className="row element-button">
                    <div className="col-sm-2">
                      <a className="btn btn-add btn-sm" href="/admin/AddReview" title="Thêm">
                        <i className="fas fa-plus"></i> Tạo Mới Đánh Giá
                      </a>
                    </div>
                  </div>

                  <div className="card mb-6">
                    <div className="card-body status-flex">
                      <div className="btn_active mb-3 margin-right ">
                        <button
                          className={`btn btn-sm me-2 ${filters.status === '' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters({ status: '', search: '', page: 1 })}
                        >
                          Tất Cả
                        </button>

                        <button
                          className={`btn btn-sm me-2 ${filters.status === 'active' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters((prev) => ({ ...prev, status: 'active', page: 1 }))}
                        >
                          Hoạt Động
                        </button>

                        <button
                          className={`btn btn-sm ${filters.status === 'inactive' ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={() => setFilters((prev) => ({ ...prev, status: 'inactive', page: 1 }))}
                        >
                          Dừng Hoạt Động
                        </button>
                      </div>

                      <div className="form-search mb-3 container-status">
                        <form
                          id="form-search"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const searchValue = e.target.keyword.value.trim();
                            setFilters((prev) => ({ ...prev, search: searchValue, page: 1 }));
                          }}
                        >
                          <div className="input-group">
                            <input type="text" placeholder="Nhập từ khóa" name="keyword" className="form-control" />
                            <button className="btn btn-success btn-css" type="submit">
                              Tìm
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }} className="selected_all">
                    <div className="selected_product">
                      <select
                        value={bulkAction}
                        onChange={(e) => setBulkAction(e.target.value)}
                        className="form-control"
                        style={{ width: '150px', display: 'inline-block', marginRight: '10px' }}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="delete">Xóa tất cả</option>
                      </select>
                      <button className="btn btn-primary" onClick={handleBulkAction}>
                        Cập nhật
                      </button>
                    </div>

                    <div className="selected_id">
                      <label>
                        Danh sách ID đánh giá được chọn:
                        <strong>{selectedReviews.join(', ')}</strong>
                      </label>
                    </div>

                    <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>
                  </div>

                  <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                      <tr>
                        <th width="10">
                          <input
                            type="checkbox"
                            id="all"
                            checked={selectedReviews.length === reviews.length && reviews.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>Tên Sản Phẩm</th>
                        <th>Email Người Dùng</th>
                        <th>Tên Người Dùng</th>
                        <th>Điểm Số</th>
                        <th>Ngày Đánh Giá</th>
                        <th>Trạng Thái</th> {/* New column for Status */}
                        <th>Chức Năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review) => (
                        <tr key={review.id_danh_gia}>
                          <td>
                            <input
                              type="checkbox"
                              value={review.id_danh_gia}
                              checked={selectedReviews.includes(review.id_danh_gia)}
                              onChange={(e) => handleCheckboxChange(e, review.id_danh_gia)}
                            />
                          </td>
                          <td>{review.ten}</td>
                          <td>{review.email}</td>
                          <td>{review.ten}</td>
                          <td>{review.diem_so}</td>
                          <td>{review.ngay_danh_gia}</td>
                          <td>
                            <span
                              className={`badge ${
                                review.trang_thai === 'active' ? 'bg-success' : 'bg-secondary'
                              }`}
                            >
                              {review.trang_thai}
                            </span>
                          </td>
                          <td className="button-action">
                            <button className="btn btn-primary btn-sm trash" title="Xóa" onClick={() => handleDelete(review.id_danh_gia)}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                            <button className="btn btn-primary btn-sm edit" title="Sửa">
                              <NavLink to={`/admin/EditReview/${review.id_danh_gia}`}>
                                <i className="fas fa-edit"></i>
                              </NavLink>
                            </button>
                            <button className="btn btn-primary btn-sm edit" title="Chi Tiết Đánh Giá">
                              <NavLink to={`/admin/ReviewDetail/${review.id_danh_gia}`}>
                                <FaEye />
                              </NavLink>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ marginTop: '1rem' }}></div>
                </div>
              </div>
            </div>
          </div>

          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                >
                  <FaArrowLeft />
                </button>
              </li>
              {[1, 2, 3, 4, 5].map((p) => (
                <li key={p} className={`page-item ${filters.page === p ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setFilters((prev) => ({ ...prev, page: p }))}>
                    {p}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                >
                  <FaArrowRight />
                </button>
              </li>
            </ul>
          </nav>
        </main>
      </div>
    </>
  );
}
export default ReviewList;
