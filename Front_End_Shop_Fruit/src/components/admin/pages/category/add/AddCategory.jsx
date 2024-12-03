import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as categoryService from "../../../../../services/CategoryService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCategory = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      description: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .required("Không được để trống")
        .min(2, "Tối thiểu 2 kí tự"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const [result, error] = await categoryService.save(values);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/category");
      }
      if (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Add Failed",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    },
  });

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
              <form method="post" onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                <div class="position-relative row form-group">
                  <label
                    for="name"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Name
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <input
                      name="categoryName"
                      placeholder="Name"
                      type="text"
                      class="form-control"
                      onChange={formik.handleChange}
                    />
                     {formik.errors.categoryName &&
                      formik.touched.categoryName && (
                        <small id="helpId" style={{ color:"red" }}>
                          {formik.errors.categoryName}
                        </small>
                      )}
                  </div>
                </div>

                <div class="position-relative row form-group">
                  <label
                    for="description"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Description
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <textarea
                      name="description"
                      placeholder="Description"
                      type="text"
                      class="form-control"
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <a href="#" class="border-0 btn btn-outline-danger mr-1">
                      <span class="btn-icon-wrapper pr-1 opacity-8">
                        <i class="fa fa-times fa-w-20"></i>
                      </span>
                      <span>Cancel</span>
                    </a>

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

export default AddCategory;
