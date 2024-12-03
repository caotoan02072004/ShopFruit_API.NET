import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as blogService from "../../../../../services/BlogService";
import { useFormik } from "formik";

const UpdateBlog = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState();
  const [blog, setBlog] = useState({});


  const fetchById = async (blogId) => {
    const [result, error] = await blogService.findById(blogId);    
    if(result){
      console.log(result.data)
      setBlog(result.data);
      setImgPreview(result.data.image || "");
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
      formik.setFieldValue("Image", file);
    }
  };

  const formik = useFormik({
    initialValues: {
      Title: blog.Title,
      Image: null,
      Content: "",
    },
    onSubmit: async (values) => {
      console.log(values)
      const formData = new FormData();
      formData.append("Title", values.Title || blog.bannerNTitleame);
      formData.append("Content", values.Content|| blog.Content);
      if (values.Image && values.Image != null) {
        formData.append("Image", values.Image);
      } else {
        formData.append("OldImage", blog.imageUrl);
      }

      const [result, error] = await blogService.update(id,formData);
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
    fetchById(id);
  }, [id]);
  return(
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
                  for="Image"
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
                    value={formik.values.Title || blog.title}
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
                    value={formik.values.Content || blog.content}
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

export default UpdateBlog;
