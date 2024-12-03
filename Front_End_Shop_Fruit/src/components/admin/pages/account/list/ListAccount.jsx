import React, { useEffect, useState } from "react";
import * as accountService from "../../../../../services/AccountService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListAccount = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const fetchAllData = async () => {
    const [result, err] = await accountService.findAll();
    if (result) {
      setData(result.data);
      console.log(result.data);
    } else {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const [res, err] = await accountService.remove(id);
      if (res) {
        setIsDelete(!isDelete);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Delete failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [isDelete]);

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

          <div class="page-title-actions">
            <Link
              to={`/admin/account/add`}
              class="btn-shadow btn-hover-shine mr-3 btn btn-primary"
            >
              <span class="btn-icon-wrapper pr-2 opacity-7">
                <i class="fa fa-plus fa-w-20"></i>
              </span>
              Create
            </Link>
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

              <div class="btn-actions-pane-right">
                <div role="group" class="btn-group-sm btn-group">
                  <button class="btn btn-focus">This week</button>
                  <button class="active btn btn-focus">Anytime</button>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th class="text-center">ID</th>
                    <th>Full Name</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Level</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item) => {
                      return (
                        <tr>
                          <td class="text-center text-muted">#{item.accountId}</td>
                          <td>
                            <div class="widget-content p-0">
                              <div class="widget-content-wrapper">
                                <div class="widget-content-left mr-3">
                                  <div class="widget-content-left">
                                    <img
                                      width="40"
                                      class="rounded-circle"
                                      data-toggle="tooltip"
                                      title="Image"
                                      data-placement="bottom"
                                      src={item.avatar}
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="widget-content-left flex2">
                                  <div class="widget-heading">{item.fullName}</div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="text-center">{item.email}</td>
                          <td class="text-center">{item.role}</td>
                          <td class="text-center">
                            {/* <a
                              href="./user-show.html"
                              class="btn btn-hover-shine btn-outline-primary border-0 btn-sm"
                            >
                              Details
                            </a> */}
                            <Link
                              to={`/admin/account/update/${item.accountId}`}
                              data-toggle="tooltip"
                              title="Edit"
                              data-placement="bottom"
                              class="btn btn-outline-warning border-0 btn-sm"
                            >
                              <span class="btn-icon-wrapper opacity-8">
                                <i class="fa fa-edit fa-w-20"></i>
                              </span>
                            </Link>
                            <button
                            className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                            onClick={() => handleDelete(item.accountId)}
                          >
                            <span className="btn-icon-wrapper opacity-8">
                              <i className="fa fa-trash fa-w-20"></i>
                            </span>
                          </button>
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

export default ListAccount;
