import React, { useEffect, useState } from 'react';
import * as orderService from "../../../../../services/OrderService";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const OrderStatusForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initPostData = {
    status: "Pending",
  };
  
  const [postData, setPostData] = useState(initPostData);
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);


  const fetchDataById = async (id) => {
    setLoading(true);
    const [result, error] = await orderService.findById(id);
    setLoading(false);
    if (result) {
      console.log(result.data);
      setStatus(result.data[0].status);
      setPostData(result.data || initPostData);
    } else if (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      status: postData.status || status,
    };

    const [result, error] = await orderService.update(id, newData);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/order"); // Chuyển hướng sau khi cập nhật thành công
    } else if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataById(id);
  }, [id]);

  return (
    <div className="container mt-4">
      <h4>Update Order Status</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Select status</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="status"
              value="Pending"
              onChange={handleChange}
              checked={status === "Pending"}
            />
            <label className="form-check-label">Chờ xử lý</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="status"
              value="Processing"
              defaultChecked={status === "Processing" ? true : false}
              onChange={handleChange}
              />
            <label className="form-check-label">Đang xử lý</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="status"
              value="Shipped"
              defaultChecked={status === "Shipped" ? true : false}
              onChange={handleChange}
            />
            <label className="form-check-label">Dã giao hàng</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="status"
              value="Delivered"
              defaultChecked={status === "Delivered" ? true : false}
              onChange={handleChange}
            />
            <label className="form-check-label">Đã giao</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="status"
              value="Canceled"
              defaultChecked={status === "Canceled" ? true : false}
              onChange={handleChange}
            />
            <label className="form-check-label">Đã hủy</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default OrderStatusForm;
