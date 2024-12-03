import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as productService from "../../../../../services/ProductService";
import * as categoryService from "../../../../../services/CategoryService";
import * as SupplierService from "../../../../../services/SupplierService";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [imgPreview, setImgPreview] = useState();
  const [product, setProduct] = useState({});


  const fetchById = async (proId) => {
    const [result, error] = await productService.findById(proId);    
    if(result){
      console.log(result.data)
      setProduct(result.data);
      setImgPreview(result.data.imageUrl || "");
    }
    if(error){
      console.log(error.response.data.message)
    }
  }

  const fetchApiData = async () => {
    const [res, err] = await categoryService.findAll();
    if (res) {
      setCategories(res.data);
    } else {
      console.log(err);
    }
    const [res1, err1] = await SupplierService.findAll();
    if (res1) {
      setSupplier(res1.data);
    } else {
      console.log(err1);
    }
  };

  const handleChangeFile = async (e) => {
    setImgPreview(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      formik.setFieldValue("ImageFile", file);
    }
  };

  const formik = useFormik({
    initialValues: {
      ProductName: product.productName,
      CategoryId: 0,
      SupplierId:0,
      Price: 0,
      Quantity: 1,
      ImageFile: null,
      Description: "",
    },
    validationSchema: Yup.object({
      Price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be greater than or equal to 0"),
    }),
    onSubmit: async (values) => {
      console.log(values)
      const formData = new FormData();
      formData.append("ProductName", values.ProductName || product.productName);
      formData.append("Price", values.Price > 0 ? values.Price : product.price);
      formData.append("Quantity", values.Quantity> 1 ? values.Quantity : product.quantity);
      formData.append("CategoryId", Number(values.CategoryId)> 0 ? values.CategoryId : product.categoryId);
      formData.append("SupplierId", Number(values.SupplierId)> 0 ? values.SupplierId : product.supplierId);
      formData.append("Description", values.Description|| product.description);
      if (values.ImageFile && values.ImageFile != null) {
        formData.append("ImageFile", values.ImageFile);
      } else {
        formData.append("OldImage", product.imageUrl);
      }

      const [result, error] = await productService.update(id,formData);
      if (result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/product");
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
    fetchApiData();
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
              Product
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
                    for="productImage"
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
                    {formik.errors.ImageFile && (
                        <small className="text-danger">
                          {formik.errors.ImageFile}
                        </small>
                      )}
                    <small class="form-text text-muted">
                      Click on the image to change (required)
                    </small>
                  </div>
                </div>

                <div class="position-relative row form-group">
                  <label
                    for="productName"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Product Name
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <input
                      type="text"
                      name="ProductName"
                      class="form-control"
                      placeholder="Name"
                      value={formik.values.ProductName ||  product.productName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                     {formik.errors.ProductName && (
                        <small className="text-danger">
                          {formik.errors.ProductName}
                        </small>
                      )}
                  </div>
                </div>

                <div class="position-relative row form-group">
                  <label
                    for="quantity"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Quantity
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <input
                      type="number"
                      name="Quantity"
                      class="form-control"
                      placeholder="Quantity"
                      value={formik.values.Quantity ||  product.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                     {formik.errors.Quantity && (
                        <small className="text-danger">
                          {formik.errors.Quantity}
                        </small>
                      )}
                  </div>
                </div>

                <div class="position-relative row form-group">
                  <label
                    for="price"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Price
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <input
                      type="text"
                      name="Price"
                      class="form-control"
                      placeholder="Price"
                      value={formik.values.Price ||  product.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                     {formik.errors.Price && (
                        <small className="text-danger">
                          {formik.errors.Price}
                        </small>
                      )}
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="Category"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Category
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <select
                      class="form-control"
                      name="CategoryId"
                      id="exampleFormControlSelect1"
                      value={formik.values.CategoryId ||  product.categoryId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option hidden>Danh mục nhà cung cấp</option>
                      {supplier &&
                        categories.map((item) => {
                          return (
                            <option value={item.categoryId} key={item.categoryId}>
                              {item.categoryName}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                <div className="position-relative row form-group">
                  <label
                    htmlFor="Supplier"
                    class="col-md-3 text-md-right col-form-label"
                  >
                    Supplier
                  </label>
                  <div class="col-md-9 col-xl-8">
                    <select
                      class="form-control"
                      name="SupplierId"
                      id="exampleFormControlSelect1"
                      value={formik.values.SupplierId ||  product.supplierId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option hidden>Danh mục nhà cung cấp</option>
                      {supplier &&
                        supplier.map((item) => {
                          return (
                            <option value={item.supplierId} key={item.supplierId}>
                              {item.supplierName}
                            </option>
                          );
                        })}
                    </select>
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
                      class="form-control"
                      name="Description"
                      id="productDescription"
                      placeholder="Description"
                      value={formik.values.Description ||  product.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                  </div>
                </div>

                <div class="position-relative row form-group mb-1">
                  <div class="col-md-9 col-xl-8 offset-md-2">
                    <Link
                      to={`/admin/product`}
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
};

export default UpdateProduct;
