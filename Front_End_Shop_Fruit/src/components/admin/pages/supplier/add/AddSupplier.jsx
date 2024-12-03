import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SupplierService from "../../../../../services/SupplierService";
import Swal from "sweetalert2";

const AddSupplier = () => {
    const initData = {
        supplierName: "",
        phone: "",
        email: "",
        address: "",
    };

    const [postData, setPostData] = useState(initData);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPostData({...postData, [name]: value});
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [result, err] = await SupplierService.save(postData);
        if (result) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Add Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/admin/supplier");
          }
          if (err) {
            console.log(err);
          }
    }
  return (
    <div class="app-main__inner">
      <div class="app-page-title">
        <div class="page-title-wrapper">
          <div class="page-title-heading">
            <div class="page-title-icon">
            <i class="fa-brands fa-react"></i>
            </div>
            <div>
              Supplier
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
              <form method="post" onSubmit={(e) => handleSubmit(e)} enctype="multipart/form-data">
                <div class="position-relative row form-group">
                  <label
                    for="supplierName"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    SupplierName
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <input
                      name="supplierName"
                      id="supplierName"
                      placeholder="SupplierName"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChange(e)}
                    />
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
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChange(e)}
                    />
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
                      name="email"
                      id="email"
                      placeholder="Email"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div class="position-relative row form-group">
                  <label
                    for="address"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Address
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <input
                      name="address"
                      id="address"
                      placeholder="Address"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <Link to={"/admin/supplier"} class="border-0 btn btn-outline-danger mr-1">
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
};

export default AddSupplier;
