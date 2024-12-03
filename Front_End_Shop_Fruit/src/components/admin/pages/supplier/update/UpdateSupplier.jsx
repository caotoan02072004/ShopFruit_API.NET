import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as SupplierService from "../../../../../services/SupplierService";
import Swal from "sweetalert2";

const UpdateSupplier = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const initPostData = {
        supplierName: "",
        phone: "",
        email: "",
        address: "",
    };

    const initData = {
        supplierName: "",
        phone: "",
        email: "",
        address: "",
    };

    const [postData, setPostData] = useState(initPostData);
    const [data, setData] = useState(initData);

    const fetchDataById = async (id) => {
        const [result, err] = await SupplierService.findById(id);
        if(result){
            setData(result.data);
        } else {
            console.log(err);
            
        }
    }

    const handleChangeValue = (e) => {
        const {name, value} = e.target;
        setPostData({...postData, [name]: value});
    };

    const handleChangeSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            supplierName: postData.supplierName
            ?postData.supplierName
            :data.supplierName,
            phone: postData.phone
            ?postData.phone
            :data.phone,
            email: postData.email
            ?postData.email
            :data.email,
            address: postData.address
            ?postData.address
            :data.address,
        };

        const [result, err] = await SupplierService.update(id, newData);
        if (result) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Update Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/admin/supplier");
          }
          if (err) {
            console.log(err);
          }
    };

    useEffect(() => {
        fetchDataById(id);
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
              Category
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
              <form method="post" onSubmit={(e) => handleChangeSubmit(e)} enctype="multipart/form-data">

                <div class="position-relative row form-group">
                  <label
                    for="supplierName"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Supplier Name
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <input
                      required
                      name="supplierName"
                      id="supplierName"
                      placeholder="Supplier Name"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChangeValue(e)}
                      defaultValue={data.supplierName}
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
                      required
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChangeValue(e)}
                      defaultValue={data.phone}
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
                      required
                      name="email"
                      id="email"
                      placeholder="Email"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChangeValue(e)}
                      defaultValue={data.email}
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
                      required
                      name="address"
                      id="address"
                      placeholder="Address"
                      type="text"
                      class="form-control"
                      onChange={(e) => handleChangeValue(e)}
                      defaultValue={data.address}
                    />
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <Link to={`/admin/supplier`} class="border-0 btn btn-outline-danger mr-1">
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

export default UpdateSupplier;
