import React, { useEffect, useState } from "react";
import * as cartService from "../../../../../services/CartService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../../redux/reducers/user";

const ListCart = () => {
  const userData = useSelector(selectUserData);
  const userId = userData.user.id;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();
  

  const fetchDataByUserId = async (userId) => {
    const [result, err] = await cartService.findById(userId);
    if (result) {
      var totalAmount = 0;
      result.data.forEach((item) => {
        totalAmount += item.totalAmount;
      });
      setTotal(totalAmount);

      setData(result.data);

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
      const [res, err] = await cartService.remove(id);
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

  const handleCheckout = async () => {
    try {
      const [res, err] = await cartService.placeOrder(userId);
      if (res.status == 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Đặt hàng thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/")
      } else {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Đặt hàng thất bại!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Lỗi kết nối!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    fetchDataByUserId(userId);
  }, [isDelete]);
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
                <h2 style={{ color: "black" }}>Shopping Cart</h2>
                <div class="breadcrumb__option">
                  <a style={{ color: "black" }} href="./index.html">
                    Home
                  </a>
                  <span style={{ color: "black" }}>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="shoping-cart spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th class="shoping__product">Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => {
                        return (
                          <tr>
                            <td class="shoping__cart__item">
                              <img
                                src={item.productImage}
                                alt="anh"
                                width={"100px"}
                              />
                              <h5>{item.productName}</h5>
                            </td>
                            <td class="shoping__cart__price">
                              ${item.productPrice}
                            </td>
                            <td class="shoping__cart__quantity">
                              <div class="quantity">
                                <div class="pro-qty">
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    min="0"
                                    max="99"
                                    name="quantity"
                                    id="quantity"
                                  />
                                </div>
                              </div>
                            </td>
                            <td class="shoping__cart__price">
                              ${item.totalAmount}
                            </td>
                            <td class="shoping__cart__item__close">
                              <button
                                className="btn btn-dark"
                                onClick={() => handleDelete(item.cartId)}
                              >
                                <i class="fa-solid fa-x"></i>
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
          <div class="row">
            <div class="col-lg-12">
              <div class="shoping__cart__btns">
                <Link to={`/shop`} class="primary-btn cart-btn">
                  CONTINUE SHOPPING
                </Link>
                <a href="#" class="primary-btn cart-btn cart-btn-right">
                  <span class="icon_loading"></span>
                  Upadate Cart
                </a>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="shoping__checkout">
                <h5>Cart Total</h5>
                <ul>
                  <li>
                    Total <span>${total}</span>
                  </li>
                </ul>
                <button onClick={handleCheckout} style={{ width:"100%" }} class="primary-btn">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListCart;
