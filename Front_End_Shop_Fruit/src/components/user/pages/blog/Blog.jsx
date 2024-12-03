import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as blogService from "../../../../services/BlogService";

const Blog = () => {
  const [data, setData] = useState([]);

  
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const fetchAllData = async () => {
    const [result, err] = await blogService.findAll();
    if (result) {
      setData(result.data);
      console.log(result.data);
      
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

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div>
      <section
        class="breadcrumb-section set-bg"
        data-setbg="img/breadcrumb.jpg"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="breadcrumb__text">
                <h2 style={{ color: "black" }}>Blog</h2>
                <div class="breadcrumb__option">
                  <Link style={{ color: "black" }} href="./index.html">
                    Home
                  </Link>
                  <span style={{ color: "black" }}>Blog</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="blog spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <div class="row">
                {data &&
                  data.map((item) => {
                    return (
                      <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="blog__item">
                          <div class="blog__item__pic">
                            <img src={item.image} style={{ width: "360px", height: "256px" }} alt="" />
                          </div>
                          <div class="blog__item__text">
                            <h5>
                              <Link href="#">
                                {item.title}
                              </Link>
                            </h5>
                            <p>
                              {item.content}    
                            </p>
                            <Link href="#" class="blog__btn">
                              READ MORE <i class="fa-solid fa-chevron-right pl-2"></i>
                            </Link>
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

export default Blog;
