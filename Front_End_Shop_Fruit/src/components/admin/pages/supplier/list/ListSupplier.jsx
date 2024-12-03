import React, { useEffect } from "react";
import { useState } from "react";
import * as SupplierService from "../../../../../services/SupplierService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListSupplier = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const fetchAllData = async () => {
    const [result, err] = await SupplierService.findAll();
    if (result) {
      setData(result.data);
    } else {
      console.log(err);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = async (e) => {
    setKeyword(e.target.value);
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
      const [res, err] = await SupplierService.remove(id);
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
              Supplier
              <div class="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>

          <div class="page-title-actions">
            <Link
              to={"/admin/supplier/add"}
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
                    className="form-control"
                    placeholder="Search in Suppier.."
                    name="keywords"
                    onChange={(e) => handleSubmit(e)}
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
                    <th>Name</th>
                    <th class="text-center">Phone</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Address</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    records
                      .filter((item) => {
                        return keyword.toLowerCase() === ""
                          ? item
                          : item.supplierName.toLowerCase().includes(keyword);
                      })
                      .map((item) => (
                        <tr key={item.supplierId}>
                          <td class="text-center text-muted">
                            {item.supplierId}
                          </td>
                          <td>
                            <div class="widget-content p-0">
                              <div class="widget-content-wrapper">
                                <div class="widget-content-left flex2">
                                  <div class="widget-heading">
                                    {item.supplierName}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">{item.phone}</td>
                          <td className="text-center">{item.email}</td>
                          <td className="text-center">{item.address}</td>
                          <td class="text-center">
                            <Link
                              to={`/admin/supplier/update/${item.supplierId}`}
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
                            onClick={() => handleDelete(item.supplierId)}
                          >
                            <span className="btn-icon-wrapper opacity-8">
                              <i className="fa fa-trash fa-w-20"></i>
                            </span>
                          </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <nav className="m-2" aria-label="...">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <Link className="page-link" href="#" onClick={prePage}>
                          Previous
                        </Link>
                      </li>
                      {numbers.map((n, i) => (
                        <li
                          className={`page-item ${
                            currentPage === n ? "active" : ""
                          }`}
                          key={i}
                        >
                          <Link
                            className="page-link"
                            href="#"
                            onClick={() => changePage(n)}
                          >
                            {n}
                          </Link>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === npage ? "disabled" : ""
                        }`}
                      >
                        <Link className="page-link" href="#" onClick={nextPage}>
                          Next
                        </Link>
                      </li>
                    </ul>
                  </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSupplier;
