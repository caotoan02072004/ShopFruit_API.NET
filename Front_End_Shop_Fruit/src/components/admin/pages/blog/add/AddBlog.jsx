import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as blogService from "../../../../../services/BlogService";

const AddBlog = () => {
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState();

  const handleChangeFile = async (e) => {
      setImgPreview(e.target.files[0]);
      const file = e.target.files[0];
      if (file) {
        setImgPreview(file);
        formik.setFieldValue("Image", file);
      }
    };
  
    const formik = useFormik({
      initialValues: {
        Title: "",
        Image: null,
        Content: "",
      },
      validationSchema: Yup.object({
        Title: Yup.string()
          .required("Title is required")
          .min(2, "Title must be at least 2 characters"),
        Image: Yup.mixed().required("Image file is required"),
      }),
      onSubmit: async (values) => {
        console.log(values)
        const formData = new FormData();
        formData.append("Title", values.Title);
        formData.append("Image", values.Image);
        formData.append("Content", values.Content);
        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const [result, error] = await blogService.save(formData);
        if (result) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/admin/blog");
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

    }, []);
return (
  <div class="app-main__inner">
    <div class="app-page-title">
      <div class="page-title-wrapper">
        <div class="page-title-heading">
          <div class="page-title-icon">
          <i class="fa-brands fa-react"></i>
          </div>
          <div>
            Blog
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
            <form onSubmit={formik.handleSubmit}
                encType="multipart/form-data">
               <div class="position-relative row form-group">
                <label
                  for="bannerImage"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Image
                </label>
                <div class="col-md-9 col-xl-8">
                  <img
                    style={{ height: "200px", cursor: "pointer" }}
                    class="thumbnail rounded-circle"
                    data-toggle="tooltip"
                    title="Click to change the image"
                    data-placement="bottom"
                    src={
                      imgPreview
                        ? URL.createObjectURL(imgPreview)
                        : "assets/images/add-image-icon.jpg"
                    }
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
                  {formik.errors.Image && (
                      <small className="text-danger">
                        {formik.errors.Image}
                      </small>
                    )}
                  <small class="form-text text-muted">
                    Click on the image to change (required)
                  </small>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="title"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Title
                </label>
                <div class="col-md-9 col-xl-8">
                  <input
                    required
                    name="Title"
                    id="Title"
                    placeholder="Title"
                    type="text"
                    class="form-control"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.Title && (
                      <small className="text-danger">
                        {formik.errors.Title}
                      </small>
                    )}
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="content"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Content
                </label>
                <div class="col-md-9 col-xl-8">
                  <textarea
                    class="form-control"
                    name="Content"
                    id="Content"
                    placeholder="Content"
                    value={formik.values.Content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.errors.Content && (
                      <small className="text-danger">
                        {formik.errors.Content}
                      </small>
                    )}
                </div>
              </div>

              <div class="position-relative row form-group mb-1">
                <div class="col-md-9 col-xl-8 offset-md-2">
                  <Link to={`/admin/blog`} class="border-0 btn btn-outline-danger mr-1">
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

export default AddBlog;
