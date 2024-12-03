import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import * as accountService from "../../../../../services/AccountService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateAccount = () => {
    const {id} = useParams();
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState();
  const [account, setAccount] = useState({});


  const fetchById = async (accId) => {
    const [result, error] = await accountService.findById(accId);    
    if(result){
      console.log(result.data)
      setAccount(result.data);
      setImgPreview(result.data.Avatar || "");
    }
    if(error){
      console.log(error.response.data.message)
    }
  }

  const handleChangeFile = async (e) => {
    setImgPreview(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      formik.setFieldValue("Avatar", file);
    }
  };

  const formik = useFormik({
    initialValues: {
        FullName: "",
        Avatar: null,
        Email: "",
        Phone: "",
        Address: "",
        Password: "",
        Role: "",
    },
    validationSchema: Yup.object({
      Price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be greater than or equal to 0"),
    }),
    onSubmit: async (values) => {
      console.log(values)
      const formData = new FormData();
      formData.append("FullName", values.FullName || account.FullName);
      formData.append("Email", values.Email || account.Email);
      formData.append("Phone", values.Phone || account.Phone);
      formData.append("Address", values.Address || account.Address);
      formData.append("Password", values.Password || account.Password);
      formData.append("Role", values.Role || account.Role);
      if (values.Avatar && values.Avatar != null) {
        formData.append("Avatar", values.Avatar);
      } else {
        formData.append("OldImage", account.Avatar);
      }

      const [result, error] = await accountService.update(id,formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/account");
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to add!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    },
  });


  useEffect(() => {
    
    fetchById(id);
  }, [id]);
    return (
        <div class="app-main__inner">
          <div class="app-page-title">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <div class="page-title-icon">
                <i class="fa-brands fa-react"></i>
                </div>
                <div>
                  Account
                  <div class="page-title-subheading">
                    View, create, update, delete and manage.
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <div class="row">
            <div class="col-md-12">
              <div class="main-card mb-3 card">
                <div class="card-body">
                  <form
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div class="position-relative row form-group">
                  <label
                    for="Avatar"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Avatar
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <img
                      style={{ height: "200px", cursor: "pointer" }}
                      class="thumbnail rounded-circle"
                      data-toggle="tooltip"
                      title="Click to change the image"
                      data-placement="bottom"
                      src={imgPreview ? imgPreview : "/add-image-icon.jpg"}
                      alt="Avatar"
                    />
                    <input
                      name="fileUpload"
                      type="file"
                      onchange="changeImg(this)"
                      class="image form-control-file"
                      // style={{ display: "none" }}
                      // value=""
                      onChange={(e) => handleChangeFile(e)}
                    />
                    {formik.errors.Avatar && (
                        <small className="text-danger">
                          {formik.errors.Avatar}
                        </small>
                      )}
                    <small class="form-text text-muted">
                      Click on the image to change (required)
                    </small>
                  </div>
                </div>
    
                    <div class="position-relative row form-group">
                      <label
                        for="fullName"
                        class="col-md-3 text-md-right col-form-label"
                      >
                        Full Name
                      </label>
                      <div class="col-md-9 col-xl-8">
                        <input
                          required
                          name="FullName"
                          id="FullName"
                          placeholder="FullName"
                          type="text"
                          class="form-control"
                          value={formik.values.FullName || account.FullName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.FullName && (
                          <small className="text-danger">
                            {formik.errors.FullName}
                          </small>
                        )}
                      </div>
                    </div>
    
                    <div class="position-relative row form-group">
                      <label
                        for="email"
                        class="col-md-3 text-md-right col-form-label"
                      >
                        Email
                      </label>
                      <div class="col-md-9 col-xl-8">
                        <input
                          required
                          name="Email"
                          id="Email"
                          placeholder="Email"
                          type="text"
                          class="form-control"
                          value={formik.values.Email || account.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.Email && (
                          <small className="text-danger">
                            {formik.errors.Email}
                          </small>
                        )}
                      </div>
                    </div>
    
                    <div class="position-relative row form-group">
                      <label
                        for="password"
                        class="col-md-3 text-md-right col-form-label"
                      >
                        Password
                      </label>
                      <div class="col-md-9 col-xl-8">
                        <input
                          required
                          name="Password"
                          id="Password"
                          placeholder="Password"
                          type="password"
                          class="form-control"
                          value={formik.values.Password || account.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.Password && (
                          <small className="text-danger">
                            {formik.errors.Password}
                          </small>
                        )}
                      </div>
                    </div>
    
                    <div class="position-relative row form-group">
                      <label
                        for="Address"
                        class="col-md-3 text-md-right col-form-label"
                      >
                        Address
                      </label>
                      <div class="col-md-9 col-xl-8">
                        <input
                          required
                          name="Address"
                          id="Address"
                          placeholder="Address"
                          type="text"
                          class="form-control"
                          value={formik.values.Address|| account.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.Address && (
                          <small className="text-danger">
                            {formik.errors.Address}
                          </small>
                        )}
                      </div>
                    </div>
                    <div class="position-relative row form-group">
                      <label
                        for="phone"
                        class="col-md-3 text-md-right col-form-label"
                      >
                        Phone
                      </label>
                      <div class="col-md-9 col-xl-8">
                        <input
                          required
                          name="Phone"
                          id="Phone"
                          placeholder="Phone"
                          type="text"
                          class="form-control"
                          value={formik.values.Phone || account.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.Phone && (
                          <small className="text-danger">
                            {formik.errors.Phone}
                          </small>
                        )}
                      </div>
                    </div>
    
                    {/* <div class="position-relative row form-group">
                      <label
                        for="Role"
                        class="col-md-3 text-md-right col-form-label"
                      >
                        Level
                      </label>
                      <div class="col-md-9 col-xl-8">
                        <input
                          required
                          name="Role"
                          id="Role"
                          placeholder="Role"
                          type="text"
                          class="form-control"
                          value={formik.values.Role}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div> */}
    
                    <div class="position-relative row form-group">
                      <label
                        for="role"
                        class="col-md-3 text-md-right col-form-label"
                      >
                        Role
                      </label>
                      <div class="col-md-9 col-xl-8">
                        <div class="row">
                          <div class="position-relative form-check mx-3 pt-sm-2">
                            <input
                              name="Role"
                              id="RoleAdmin"
                              type="radio"
                              class="form-check-input"
                              value="Admin"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.Role === "Admin"}
                            />
                            <label for="RoleAdmin" class="form-check-label">
                              Admin
                            </label>
                          </div>
                          <div class="position-relative form-check pt-sm-2">
                            <input
                              name="Role"
                              id="RoleUser"
                              type="radio"
                              class="form-check-input"
                              value="User"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.Role === "User"}
                            />
                            <label for="RoleUser" class="form-check-label">
                              User
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
    
                    <div class="position-relative row form-group mb-1">
                      <div class="col-md-9 col-xl-8 offset-md-2">
                        <Link
                          to={`/admin`}
                          class="border-0 btn btn-outline-danger mr-1"
                        >
                          <span class="btn-icon-wrapper pr-1 opacity-8">
                            <i class="fa fa-times fa-w-20"></i>
                          </span>
                          <span>Cancel</span>
                        </Link>
    
                        <button
                          type="submit"
                          class="btn-shadow btn-hover-shine btn btn-primary"
                        >
                          <span class="btn-icon-wrapper pr-2 opacity-8">
                            <i class="fa fa-download fa-w-20"></i>
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
}

export default UpdateAccount