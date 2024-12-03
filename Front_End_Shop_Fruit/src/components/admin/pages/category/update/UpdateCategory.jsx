import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as categoryService from "../../../../../services/CategoryService";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const initPostData = {
    categoryName: "",
    description: "",
  };
  const initData = {
    categoryName: "",
    description: "",
  };
  
  const [postData, setPostData] = useState(initPostData);
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(true); // Thêm state để theo dõi việc tải dữ liệu

  const fetchDataById = async (id) => {
    setLoading(true);
    const [result, error] = await categoryService.findById(id);
    setLoading(false);
    
    if (result) {
      console.log(result.data);
      setData(result.data || initData);
      setPostData(result.data || initPostData); // Cập nhật postData với dữ liệu nhận được
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
      categoryName: postData.categoryName || data.categoryName,
      description: postData.description || data.description,
    };

    const [result, error] = await categoryService.update(id, newData);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/category"); // Chuyển hướng sau khi cập nhật thành công
    } else if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataById(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo "Loading" trong khi dữ liệu đang được tải
  }

  return (
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
            <i class="fa-brands fa-react"></i>
            </div>
            <div>
              Category
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="main-card mb-3 card">
            <div className="card-body">
              <form method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
                <div className="position-relative row form-group">
                  <label htmlFor="name" className="col-md-3 text-md-right col-form-label">
                    Name
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <input
                      required
                      name="categoryName"
                      placeholder="Enter your Name"
                      type="text"
                      className="form-control"
                      value={postData.categoryName || data.categoryName} // Sử dụng value
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label htmlFor="description" className="col-md-3 text-md-right col-form-label">
                    Description
                  </label>
                  <div className="col-md-9 col-xl-8">
                    <textarea
                      name="description"
                      placeholder="Description"
                      className="form-control"
                      value={postData.description || data.description} // Sử dụng value
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="position-relative row form-group mb-1">
                  <div className="col-md-9 col-xl-8 offset-md-2">
                    <Link to="/admin/category" className="border-0 btn btn-outline-danger mr-1">
                      <span className="btn-icon-wrapper pr-1 opacity-8">
                        <i className="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Cancel</span>
                    </Link>

                    <button
                      type="submit"
                      className="btn-shadow btn-hover-shine btn btn-primary"
                    >
                      <span className="btn-icon-wrapper pr-2 opacity-8">
                        <i className="fa fa-download fa-w-20"></i>
                      </span>
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
