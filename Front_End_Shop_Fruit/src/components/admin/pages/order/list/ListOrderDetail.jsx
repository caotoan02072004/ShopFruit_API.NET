import React, { useEffect, useState } from "react";
import * as orderService from "../../../../../services/OrderService";
import { useParams } from "react-router-dom";

const ListOrderDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [list, setList] = useState([]);

  const fetchById = async (orderId) => {
    const [result, error] = await orderService.findById(orderId);
    if (result) {
      setList(result.data[0].orderDetails)
      setData(result.data);
    }
    if (error) {
      console.log(error.response.data.message);
    }
  };

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
              Order Detail
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
              <div class="table-responsive">
                <h2 class="text-center">Products list</h2>
                <hr />
                <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th class="text-center">Quantity</th>
                      <th class="text-center">Unit Price</th>
                      <th class="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list &&
                      list.map((item) => {
                        return (
                          <tr>
                            <td>
                              <div class="widget-content p-0">
                                <div class="widget-content-wrapper">
                                  <div class="widget-content-left mr-3">
                                    <div class="widget-content-left">
                                      <img
                                        style={{ height: "60px" }}
                                        data-toggle="tooltip"
                                        title="Image"
                                        data-placement="bottom"
                                        src={item.productImage}
                                        alt=""
                                      />
                                    </div>
                                    {console.log(
                                      data[0].orderDetails.productImage
                                    )}
                                  </div>
                                  <div class="widget-content-left flex2">
                                    <div class="widget-heading">
                                      Pure Pineapple
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="text-center">2</td>
                            <td class="text-center">$10.00</td>
                            <td class="text-center">$20.00</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <h2 class="text-center mt-5">Order info</h2>
              <hr />
              <div class="position-relative row form-group">
                <label for="name" class="col-md-3 text-md-right col-form-label">
                  Full Name
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>CodeLean</p>
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
                  <p>info@CodeLean.vn</p>
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
                  <p>0123456789</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="company_name"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Company Name
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>CodeLean</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="street_address"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Street Address
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>Ton That Thuyet, Ha Noi</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="town_city"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Town City
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>Ha Noi</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="country"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Country
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>Viet Nam</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="postcode_zip"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Postcode Zip
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>10000</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="payment_type"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Payment Type
                </label>
                <div class="col-md-9 col-xl-8">
                  <p>Pay Later</p>
                </div>
              </div>

              <div class="position-relative row form-group">
                <label
                  for="status"
                  class="col-md-3 text-md-right col-form-label"
                >
                  Status
                </label>
                <div class="col-md-9 col-xl-8">
                  <div class="badge badge-dark mt-2">Finish</div>
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
                  <p>description</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrderDetail;
