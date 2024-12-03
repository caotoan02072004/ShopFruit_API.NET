import React, { useEffect, useState } from "react";
import * as orderService from "../../../../../services/OrderService";
import { Link } from "react-router-dom";

const ListOrder = () => {
  const [data, setData] = useState([]);

  const fetchAllData = async () => {
    const [result, err] = await orderService.findAll();
    if (result) {
      setData(result.data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllData();
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
              Order
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
            <div class="card-header">
              <form>
                <div class="input-group">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search everything"
                    class="form-control"
                  />
                  <span class="input-group-append">
                    <button type="submit" class="btn btn-primary">
                      <i class="fa fa-search"></i>&nbsp; Search
                    </button>
                  </span>
                </div>
              </form>
            </div>

            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th class="text-center">ID</th>
                    <th>Customer / Products</th>
                    <th class="text-center">Address</th>
                    <th class="text-center">Amount</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item) => {
                      return (
                        <tr>
                          <td class="text-center text-muted">
                            #{item.orderId}
                          </td>
                          <td>
                            <div class="widget-content p-0">
                              <div class="widget-content-wrapper">
                                <div class="widget-content-left mr-3">
                                  {/* <div class="widget-content-left">
                                    <img
                                      style={{ height: "60px" }}
                                      data-toggle="tooltip"
                                      title="Image"
                                      data-placement="bottom"
                                      src={item.orderDetails.productImage}
                                      alt=""
                                    />
                                  </div> */}
                                </div>
                                <div class="widget-content-left flex2">
                                  <div class="widget-heading">
                                    {item.fullName}
                                  </div>
                                  {/* <div class="widget-subheading opacity-7">
                                    {item.orderDetails.productName}
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="text-center">{item.address}</td>
                          <td class="text-center">${item.totalAmount}</td>
                          <td class="text-center">
                            <div class="badge badge-dark">{item.status}</div>
                          </td>
                          <td class="text-center">
                            <Link
                             to={`/admin/order/detail/${item.orderId}`}
                              class="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                            >
                              Details
                            </Link>
                            <Link
                              to={`/admin/order/update/${item.orderId}`}
                              data-toggle="tooltip"
                              title="Edit"
                              data-placement="bottom"
                              class="btn btn-outline-warning border-0 btn-sm"
                            >
                              <span class="btn-icon-wrapper opacity-8">
                                <i class="fa fa-edit fa-w-20"></i>
                              </span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
