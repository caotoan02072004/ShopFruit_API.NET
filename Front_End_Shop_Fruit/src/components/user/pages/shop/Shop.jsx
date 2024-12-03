import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as productService from "../../../../services/ProductService";
import * as categoryService from "../../../../services/CategoryService";
import "./shop.css";

const Shop = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const fetchDataProduct = async () => {
    const [result, err] = await productService.findAll();
    if (result) {
      setData(result.data);
    } else {
      console.log(err);
    }
  };

  const fetchDataName = async () => {
    const [result, err] = await categoryService.findAll();
    if (result) {
      setName(result.data);
    } else {
      console.log(err);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    const [result, err] = await productService.sortByCategory(categoryId);
    if (result) {
      setData(result);
    } else {
      console.log(err);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProductsByCategory(categoryId);
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

  const handleSortChange = async (e) => {
    const sortOrder = e.target.value;
    const [result, err] = await productService.sortByPrice(sortOrder);

    if (result) {
      setData(result.data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataProduct();
    fetchDataName();
  }, []);
  return (
    <div>
      <section class="breadcrumb-section set-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="breadcrumb__text">
                <h2 style={{ color: "black" }}>Organi Shop</h2>
                <div class="breadcrumb__option" style={{ color: "black" }}>
                  <Link style={{ color: "black" }} href="./index.html">
                    Home
                  </Link>
                  <span style={{ color: "black" }}>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="product spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-5">
              <div class="sidebar">
                <div class="sidebar__item">
                  <h4>Department</h4>
                  <ul>
                    {name &&
                      name.map((item) => {
                        return (
                          <li key={item.categoryId}>
                            <Link
                              href="#"
                              onClick={() =>
                                handleCategoryChange(item.categoryId)
                              }
                            >
                              {item.categoryName}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-9 col-md-7">
              <div class="filter__item">
                <div class="row">
                  <div class="col-lg-4 col-md-5">
                    <div class="filter__sort">
                      <span>Sort By</span>
                      <select
                        className="ml-1 px-2 text-center"
                        onChange={handleSortChange}
                      >
                        <option value="default">Default</option>
                        <option value="asc">MIN - MAX</option>
                        <option value="desc">MAX - MIN</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-3">
                    <div class="blog__sidebar__search">
                      <form
                        action="#"
                        style={{ width: "300px", marginLeft: "260px" }}
                      >
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search..."
                          name="keywords"
                          onChange={(e) => handleChangeValue(e)}
                        />
                        <button type="submit">
                          <span>
                            <i class="fa-solid fa-magnifying-glass"></i>
                          </span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                {data &&
                  records
                    .filter((item) => {
                      return keyword.toLowerCase() === ""
                        ? item
                        : item.productName.toLowerCase().includes(keyword);
                    })
                    .map((item) => {
                      return (
                        <div class="col-lg-4 col-md-6 col-sm-6">
                          <div class="product__item">
                            <div class="product__item__pic set-bg">
                              <Link to={`/detail/${item.productId}`}>
                                <img src={item.imageUrl} width={"262px"} height={"263px"} alt="" />
                              </Link>
                              <ul class="product__item__pic__hover">
                                <li>
                                  <Link href="#">
                                    <i class="fa fa-heart"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i class="fa fa-retweet"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <i class="fa fa-shopping-cart"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div class="product__item__text">
                              <h6>
                                <Link href="#">{item.productName}</Link>
                              </h6>
                              <h5>${item.price}</h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <nav aria-label="...">
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
      </section>
    </div>
  );
};

export default Shop;
