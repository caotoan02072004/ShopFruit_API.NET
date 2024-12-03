import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearData, selectUserData } from "../../../../redux/reducers/user";

const UserHeader = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  console.log(userData);

  return (
    <div>
      <div id="preloder">
        <div class="loader"></div>
      </div>
      <div class="humberger__menu__overlay"></div>
      <div class="humberger__menu__wrapper">
        <div class="humberger__menu__logo">
          <Link href="./index.html">
            <img src="/assets/images/logo.png" alt="" />
          </Link>
        </div>
        <div class="humberger__menu__cart">
          <ul>
            <li>
              <Link href="#">
                <i class="fa fa-heart"></i> <span>1</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <i class="fa fa-shopping-bag"></i> <span>3</span>
              </Link>
            </li>
          </ul>
          <div class="header__cart__price">
            item: <span>$150.00</span>
          </div>
        </div>
        <div class="humberger__menu__widget">
          <div class="header__top__right__language">
            <img src="%PUBLIC_URL%/assets/images/language.png" alt="" />
            <div>English</div>
            <span class="arrow_carrot-down"></span>
            <ul>
              <li>
                <Link href="#">Spanis</Link>
              </li>
              <li>
                <Link href="#">English</Link>
              </li>
            </ul>
          </div>
          <div class="header__top__right__auth">
            <Link href="#">
              <i class="fa fa-user"></i> Login
            </Link>
          </div>
        </div>
        {/* <div class="footer__about__logo">
          <Link href="./index.html">
            <img src="/assets/images/logo.png" alt="" />
          </Link>
        </div> */}
        <nav class="humberger__menu__nav mobile-menu">
          <ul>
            <li class="active">
              <Link href="./index.html">Home</Link>
            </li>
            <li>
              <Link href="./shop-grid.html">Shop</Link>
            </li>
            <li>
              <Link href="#">Pages</Link>
              <ul class="header__menu__dropdown">
                <li>
                  <Link href="./shop-details.html">Shop Details</Link>
                </li>
                <li>
                  <Link href="./shoping-cart.html">Shoping Cart</Link>
                </li>
                <li>
                  <Link href="./checkout.html">Check Out</Link>
                </li>
                <li>
                  <Link href="./blog-details.html">Blog Details</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="./blog.html">Blog</Link>
            </li>
            <li>
              <Link href="./contact.html">Contact</Link>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div class="header__top__right__social">
          <Link href="#">
            <i class="fa fa-facebook"></i>
          </Link>
          <Link href="#">
            <i class="fa fa-twitter"></i>
          </Link>
          <Link href="#">
            <i class="fa fa-linkedin"></i>
          </Link>
          <Link href="#">
            <i class="fa fa-pinterest-p"></i>
          </Link>
        </div>
        <div class="humberger__menu__contact">
          <ul>
            <li>
              <i class="fa fa-envelope"></i> hello@colorlib.com
            </li>
            <li>Free Shipping for all Order of $99</li>
          </ul>
        </div>
      </div>
      <header class="header">
        <div class="header__top">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="header__top__left">
                  <ul>
                    <li>
                      <i class="fa fa-envelope"></i> hello@colorlib.com
                    </li>
                    <li>Free Shipping for all Order of $99</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="header__top__right">
                  <div class="header__top__right__social">
                    <Link href="#">
                      <i class="fa fa-facebook"></i>
                    </Link>
                    <Link href="#">
                      <i class="fa fa-twitter"></i>
                    </Link>
                    <Link href="#">
                      <i class="fa fa-linkedin"></i>
                    </Link>
                    <Link href="#">
                      <i class="fa fa-pinterest-p"></i>
                    </Link>
                  </div>
                  <div class="header__top__right__language">
                    <img src="%PUBLIC_URL%/assets/images/language.png" alt="" />
                    <div>English</div>
                    <span class="arrow_carrot-down"></span>
                    <ul>
                      <li>
                        <Link href="#">Spanis</Link>
                      </li>
                      <li>
                        <Link href="#">English</Link>
                      </li>
                    </ul>
                  </div>
                  <div class="header__top__right__auth">
                    <Link to={`admin/login`}>
                      <img
                        width="42"
                        class="rounded-circle"
                        src={userData.user.avatar}
                        alt=""
                      />{" "}
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="header__logo">
                <Link href="./index.html">
                  <img src="/assets/images/logo.png" alt="anh" />
                </Link>
              </div>
            </div>
            <div class="col-lg-6">
              <nav class="header__menu">
                <ul>
                  <li class="active">
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li>
                    <Link to={`/shop`}>Shop</Link>
                  </li>
                  <li>
                    <Link to={`/blog`}>Blog</Link>
                  </li>
                  <li>
                    <Link to={`/contact`}>Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-lg-3">
              <div class="header__cart">
                <ul>
                  <li>Xin chào: <b>{userData.user.fullName}</b></li>
                  <li></li>
                  <li>
                    <Link to={`/cart`}>
                      <i class="fa fa-shopping-bag"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="humberger__open">
            <i class="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserHeader;
