import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as productService from "../../../../../services/ProductService";
import Swal from "sweetalert2";

const ListProduct = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [keyword, setKeyword] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const fetchAllData = async () => {
    const [result, error] = await productService.findAll();
    console.log(result.data);
    if (result) {
      setData(result.data);
    } else {
      console.log(error);
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

  const handleChangeValue = async (e) => {
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
      const [res, err] = await productService.remove(id);
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
    <div className="app-main__inner">
      <div className="app-page-title">
        <div className="page-title-wrapper">
          <div className="page-title-heading">
            <div className="page-title-icon">
            <i class="fa-brands fa-react"></i>
            </div>
            <div>
              Product
              <div className="page-title-subheading">
                View, create, update, delete and manage.
              </div>
            </div>
          </div>
          <div className="page-title-actions">
            <Link to={"/admin/product/add"} className="btn-shadow btn-hover-shine mr-3 btn btn-primary">
              <span className="btn-icon-wrapper pr-2 opacity-7">
                <i className="fa fa-plus fa-w-20"></i>
              </span>
              Create
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="main-card mb-3 card">
            <div className="card-header">
            <form>
                <div class="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search in Product.."
                    name="keywords"
                    onChange={(e) => handleChangeValue(e)}
                  />
                  <span class="input-group-append">
                    <button type="submit" class="btn btn-primary">
                      <i class="fa fa-search"></i>&nbsp; Search
                    </button>
                  </span>
                </div>
              </form>
            </div>

            <div className="table-responsive">
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Supplier</th>
                    {/* <th className="text-center">Description</th> */}
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && records.filter((item) => {
                        return keyword.toLowerCase() === ""
                          ? item
                          : item.productName.toLowerCase().includes(keyword);
                      })
                    .map((item) => (
                      <tr key={item.productId}>
                        <td className="text-center text-muted">#{item.productId}</td>
                        <td className="text-center">{item.productName}</td>
                        <td className="text-center">
                          <img style={{ height: "60px" }} src={item.imageUrl} alt="Image" />
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">${item.price}</td>
                        <td className="text-center">{item.category.categoryName}</td>
                        <td className="text-center">{item.supplier.supplierName}</td>
                        {/* <td className="text-center">{item.description}</td> */}
                        <td className="text-center">
                          <Link to={`/admin/product/detail/${item.productId}`} className="btn btn-hover-shine btn-outline-primary border-0 btn-sm">
                            Details
                          </Link>
                          <Link to={`/admin/product/update/${item.productId}`} className="btn btn-outline-warning border-0 btn-sm">
                            <span className="btn-icon-wrapper opacity-8">
                              <i className="fa fa-edit fa-w-20"></i>
                            </span>
                          </Link>
                          <button
                            className="btn btn-hover-shine btn-outline-danger border-0 btn-sm"
                            onClick={() => handleDelete(item.productId)}
                          >
                            <span className="btn-icon-wrapper opacity-8">
                              <i className="fa fa-trash fa-w-20"></i>
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
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

export default ListProduct;
