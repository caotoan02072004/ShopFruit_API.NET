import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div class="app-sidebar sidebar-shadow">
        <div class="app-header__logo">
            <div class="logo-src">
            </div>
            <div class="header__pane ml-auto">
                <div>
                    <button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
                        data-class="closed-sidebar">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="app-header__mobile-menu">
            <div>
                <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-header__menu">
            <span>
                <button type="button"
                    class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                    <span class="btn-icon-wrapper">
                        <i class="fa fa-ellipsis-v fa-w-6"></i>
                    </span>
                </button>
            </span>
        </div>
        <div class="scrollbar-sidebar">
            <div class="app-sidebar__inner">
                <ul class="vertical-nav-menu">
                    <li class="app-sidebar__heading">Menu</li>

                    <li class="mm-active">
                        <a href="#">
                            <i class="metismenu-icon pe-7s-plugin"></i>Applications
                            <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                        </a>
                        <ul>
                            <li>
                                <Link to={`/admin`}>
                                    <i class="metismenu-icon"></i>Account
                                </Link>
                            </li>
                            <li>
                                <Link to={`/admin/order`}>
                                    <i class="metismenu-icon"></i>Order
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/product"}>
                                    <i class="metismenu-icon"></i>Product
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/category"}>
                                    <i class="metismenu-icon"></i>Category
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/supplier"}>
                                    <i class="metismenu-icon"></i>Supplier
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/banner"}>
                                    <i class="metismenu-icon"></i>Banner
                                </Link>
                            </li>
                            <li>
                                <Link to={"/admin/blog"}>
                                    <i class="metismenu-icon"></i>Blog
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default AdminSideBar;