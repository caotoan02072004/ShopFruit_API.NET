import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
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
                <h2 style={{ color: "black" }}>Contact Us</h2>
                <div class="breadcrumb__option">
                  <Link style={{ color: "black" }} href="./index.html">
                    Home
                  </Link>
                  <span style={{ color: "black" }}>Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="contact spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div class="contact__widget">
                <span>
                  <i class="fa-solid fa-phone"></i>
                </span>
                <h4>Phone</h4>
                <p>+01-3-8888-6868</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div class="contact__widget">
                <span>
                  <i class="fa-solid fa-location-dot"></i>
                </span>
                <h4>Address</h4>
                <p>60-49 Road 11378 New York</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div class="contact__widget">
                <span>
                  <i class="fa-regular fa-clock"></i>
                </span>
                <h4>Open time</h4>
                <p>10:00 am to 23:00 pm</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div class="contact__widget">
                <span>
                  <i class="fa-regular fa-envelope"></i>
                </span>
                <h4>Email</h4>
                <p>hello@colorlib.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.58346601787406!2d105.87458657026174!3d21.13904433877802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350138bdc383c5%3A0xd70223c8535ca5a7!2zTmjDoCB2xINuIGhvw6EgdGjDtG4gVHJ1bmcgROG7pWMgbuG7mWk!5e0!3m2!1svi!2s!4v1731506253226!5m2!1svi!2s" width="600" height="450" style={{ border:"1px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="map-inside">
          <i class="icon_pin"></i>
          <div class="inside-widget">
            <h4>Hà Nội</h4>
            <ul>
              <li>Phone: +84-6589-125</li>
              <li>Add: Nhà văn hóa thôn Trung. Đông Anh, Hà Nội</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="contact-form spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="contact__form__title">
                <h2>Leave Message</h2>
              </div>
            </div>
          </div>
          <form action="#">
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <input type="text" placeholder="Your name" />
              </div>
              <div class="col-lg-6 col-md-6">
                <input type="text" placeholder="Your Email" />
              </div>
              <div class="col-lg-12 text-center">
                <textarea placeholder="Your message"></textarea>
                <button type="submit" class="site-btn">
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
