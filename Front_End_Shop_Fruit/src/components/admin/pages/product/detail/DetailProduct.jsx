import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as productService from "../../../../../services/ProductService";
import * as categoryService from "../../../../../services/CategoryService";
import * as supplierService from "../../../../../services/SupplierService";
import { useFormik } from "formik";

const DetailProduct = () => {
    const {id} = useParams();
    const [categories, setCategories] = useState("");
    const [supplier, setSupplier] = useState("");
    const [product, setProduct] = useState({});
    
    const fetchById = async (proId) => {
        const [result, error] = await productService.findById(proId);    
        if(result){
          setCategories(result.data.category.categoryName);
          setSupplier(result.data.supplier.supplierName);
          setProduct(result.data);
        }
        if(error){
          console.log(error.response.data.message)
        }
      }

    useEffect(() => {
        fetchById(id);
    },[id]);

  return (
    <div class="app-main__inner">
      <div class="app-page-title">
        <div class="page-title-wrapper">
          <div class="page-title-heading">
            <div class="page-title-icon">
              <i class="pe-7s-ticket icon-gradient bg-mean-fruit"></i>
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
            <div class="card-body display_data">
              <div class="position-relative row form-group">
                <label for="" class="col-md-3 text-md-right col-form-label">
                  Images
                </label>
                <div class="col-md-9 col-xl-8">
                  <ul class="text-nowrap overflow-auto" id="images">
                    <li class="d-inline-block mr-1" style={{ position: "relative" }}>
                      <img
                        style={{ height:"150px" }}
                        src={product.imageUrl}
                        alt="Image"
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="brand_id"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Product Name
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>
                    {product.productName}
                  </p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="brand_id"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Category
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>
                    {categories}
                  </p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="brand_id"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Supplier
                </label>
                <div class="col-md-9 col-xl-8">
                  {console.log(supplier)}
                  <p>{supplier}</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="product_category_id"
                  class="col-md-3 text-md-right col-form-label"
                >
                  price
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>${product.price}</p>
                </div>
              </div>
              <div class="position-relative row form-group">
                <label
                  for="product_category_id"
                  class="col-md-3 text-md-right col-form-label"
                >
                  quantity
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>{product.quantity}</p>
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
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
