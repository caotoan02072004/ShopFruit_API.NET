import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as productService from "../../../../services/ProductService";
import * as cartService from "../../../../services/CartService";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/reducers/user";

const Detail = () => {
  const userData = useSelector(selectUserData);
  const userId = userData.user.id;
  const { id } = useParams();
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const handleMinus = (event) => {
    event.preventDefault();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  console.log(userId);
  

  const handlePlus = (event) => {
    event.preventDefault();
    setQuantity((prev) => (prev < 50 ? prev + 1 : 50));
  };

  const fetchDataById = async (proId) => {
    const [result, err] = await productService.findById(proId);
    if (result) {
      setData(result.data);
    } else {
      console.log(err);
    }
  };

  const addToCart = async () => {
    if (!id || quantity <= 0) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Invalid product or quantity",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  
    const cartData = {
      productId: id,
      accountId: userId,
      quantity: quantity,
    };
  
    try {
      const [result, err] = await cartService.addToCart(cartData);
  
      if (result == 200) {
        setCart(result.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added to cart successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to add to cart!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Error adding to cart:", err);
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Unexpected error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Unexpected error:", error);
    }
  };
  
  

  useEffect(() => {
    fetchDataById(id);
  }, [id]);

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
                <h2 style={{ color: "black" }}>Vegetable’s Package</h2>
                <div class="breadcrumb__option">
                  <Link style={{ color: "black" }} href="./index.html">
                    Home
                  </Link>
                  <Link style={{ color: "black" }} href="./index.html">
                    Vegetables
                  </Link>
                  <span style={{ color: "black" }}>Vegetable’s Package</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="product-details spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="product__details__pic">
                <div class="product__details__pic__item">
                  <img
                    class="product__details__pic__item--large"
                    src={data.imageUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="product__details__text">
                <h3>{data.productName}</h3>
                <div class="product__details__price">${data.price}</div>
                <p>{data.description}</p>
                <div class="product__details__quantity">
                  <div class="quantity">
                    <button
                      class="btn_minus"
                      style={{ width: "50px", height: "50px" }}
                      onClick={handleMinus}
                    >
                      <i class="fa-sharp fa-solid fa-caret-down"></i>
                    </button>
                    <input
                      type="text"
                      min="0"
                      max="99"
                      name="quantity"
                      value={quantity}
                      id="quantity"
                      class="cart-quantity text-center mx-2"
                      style={{ width: "70px", height: "50px" }}
                    />
                    <button
                      class="btn_plus"
                      style={{ width: "50px", height: "50px" }}
                      onClick={handlePlus}
                    >
                      <i class="fa-sharp fa-solid fa-caret-up"></i>
                    </button>
                  </div>
                </div>
                <button onClick={addToCart} class="primary-btn">
                  ADD TO CARD
                </button>
                <ul>
                  <li>
                    <b>Shipping</b>{" "}
                    <span>
                      01 day shipping. <samp>Free pickup today</samp>
                    </span>
                  </li>
                  <li>
                    <b>Share on</b>
                    <div class="share">
                      <Link href="#">
                        <i class="fa fa-facebook"></i>
                      </Link>
                      <Link href="#">
                        <i class="fa fa-twitter"></i>
                      </Link>
                      <Link href="#">
                        <i class="fa fa-instagram"></i>
                      </Link>
                      <Link href="#">
                        <i class="fa fa-pinterest"></i>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
