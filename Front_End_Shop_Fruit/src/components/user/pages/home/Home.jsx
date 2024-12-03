import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import * as productService from "../../../../services/ProductService";
import * as blogService from "../../../../services/BlogService";
import * as bannerService from "../../../../services/BannerService";

const Home = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);

  const fetchProduct = async () => {
    const [result, err] = await productService.findAll();
    if (result) {
      setDataProduct(result.data);
    } else {
      console.log(err);
    }
  };

  const fetchBlog = async () => {
    const [result, err] = await blogService.findTalkBlog();
    if (result) {
      console.log(result.data);
      setDataBlog(result.data);
    } else {
      console.log(err);
    }
  };

  const fetchBanner = async () => {
    const [result, err] = await bannerService.findTakeBanner();
    if (result) {
      setDataBanner(result.data);
      console.log(result.data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchBlog();
    fetchBanner();
  }, []);

  return (
    <>
      <section class="hero">
        <div class="container">
          <div class="col-lg-12">
            <div class="hero__search">
              <div class="hero__search__form">
                <form action="#">
                  <div class="hero__search__categories">
                    All Categories
                    <span class="arrow_carrot-down"></span>
                  </div>
                  <input type="text" placeholder="What do yo u need?" />
                  <button type="submit" class="site-btn">
                    SEARCH
                  </button>
                </form>
              </div>
              <div class="hero__search__phone">
                <div class="hero__search__phone__icon">
                  <i class="fa fa-phone"></i>
                </div>
                <div class="hero__search__phone__text">
                  <h5>+84 53.915.619</h5>
                  <span>support 24/7 time</span>
                </div>
              </div>
            </div>
            <div class="hero__item set-bg">
              {dataBanner &&
                dataBanner.map((item) => {
                  return (
                    <>
                      <img src={item.image} alt="anh" />
                      <div class="hero__text">
                        <span>{item.bannerName}</span>
                        <p style={{ width:"380px" }}>{item.description}</p>
                        <Link href="#" class="primary-btn">
                          SHOP NOW
                        </Link>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section class="categories">
        <div class="container">
          <div class="row">
            <div class="categories__slider owl-carousel">
              <div class="col-lg-3">
                <div
                  class="categories__item set-bg"
                  data-setbg="img/categories/cat-1.jpg"
                >
                  <h5>
                    <Link href="#">Fresh Fruit</Link>
                  </h5>
                </div>
              </div>
              <div class="col-lg-3">
                <div
                  class="categories__item set-bg"
                  data-setbg="img/categories/cat-2.jpg"
                >
                  <h5>
                    <Link href="#">Dried Fruit</Link>
                  </h5>
                </div>
              </div>
              <div class="col-lg-3">
                <div
                  class="categories__item set-bg"
                  data-setbg="img/categories/cat-3.jpg"
                >
                  <h5>
                    <Link href="#">Vegetables</Link>
                  </h5>
                </div>
              </div>
              <div class="col-lg-3">
                <div
                  class="categories__item set-bg"
                  data-setbg="img/categories/cat-4.jpg"
                >
                  <h5>
                    <Link href="#">drink fruits</Link>
                  </h5>
                </div>
              </div>
              <div class="col-lg-3">
                <div
                  class="categories__item set-bg"
                  data-setbg="img/categories/cat-5.jpg"
                >
                  <h5>
                    <Link href="#">drink fruits</Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="featured spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title">
                <h2>New Product</h2>
              </div>
            </div>
          </div>
          <div class="row">
            {dataProduct &&
              dataProduct.map((item) => {
                return (
                  <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                    <div class="featured__item">
                      <div class="featured__item__pic set-bg">
                        <Link to={`/detail/${item.productId}`}>
                          <img src={item.imageUrl} width={"262px"} height={"263px"} alt="" />
                        </Link>
                        <ul class="featured__item__pic__hover">
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
                      <div class="featured__item__text">
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
        </div>
      </section>

      <div class="banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="banner__pic">
                <img src="assets/images/banner/banner-1.jpg" alt="" />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="banner__pic">
                <img src="assets/images/banner/banner-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="from-blog spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title from-blog__title">
                <h2>From The Blog</h2>
              </div>
            </div>
          </div>
          <div class="row">
            {dataBlog &&
              dataBlog.map((item) => {
                return (
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="blog__item">
                      <div class="blog__item__pic">
                        <img
                          src={item.image}
                          alt="anh"
                          style={{ width: "360px", height: "256px" }}
                        />
                      </div>
                      <div class="blog__item__text">
                        <h5>
                          <Link href="#">{item.title}</Link>
                        </h5>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="blog__item">
                <div class="blog__item__pic">
                  <img src="/assets/images/blog/blog-2.jpg" alt="" />
                </div>
                <div class="blog__item__text">
                  <ul>
                    <li>
                      <i class="fa fa-calendar-o"></i> May 4,2019
                    </li>
                    <li>
                      <i class="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <Link href="#">6 ways to prepare breakfast for 30</Link>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <div class="blog__item">
                <div class="blog__item__pic">
                  <img src="/assets/images/blog/blog-3.jpg" alt="" />
                </div>
                <div class="blog__item__text">
                  <ul>
                    <li>
                      <i class="fa fa-calendar-o"></i> May 4,2019
                    </li>
                    <li>
                      <i class="fa fa-comment-o"></i> 5
                    </li>
                  </ul>
                  <h5>
                    <Link href="#">Visit the clean farm in the US</Link>
                  </h5>
                  <p>
                    Sed quia non numquam modi tempora indunt ut labore et dolore
                    magnam aliquam quaerat{" "}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
