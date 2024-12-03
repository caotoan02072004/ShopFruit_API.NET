import React from 'react'
import { Link } from 'react-router-dom'

const UserFooter = () => {
  return (
    <footer class="footer spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="footer__about">
                        <div class="footer__about__logo">
                            <Link href="./index.html"><img src="/assets/images/logo.png" alt=""/></Link>
                        </div>
                        <ul>
                            <li>Address: 60-49 Road 11378 New York</li>
                            <li>Phone: +65 11.188.888</li>
                            <li>Email: hello@colorlib.com</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                    <div class="footer__widget">
                        <h6>Useful Links</h6>
                        <ul>
                            <li><Link href="#">About Us</Link></li>
                            <li><Link href="#">About Our Shop</Link></li>
                            <li><Link href="#">Secure Shopping</Link></li>
                            <li><Link href="#">Delivery infomation</Link></li>
                            <li><Link href="#">Privacy Policy</Link></li>
                            <li><Link href="#">Our Sitemap</Link></li>
                        </ul>
                        <ul>
                            <li><Link href="#">Who We Are</Link></li>
                            <li><Link href="#">Our Services</Link></li>
                            <li><Link href="#">Projects</Link></li>
                            <li><Link href="#">Contact</Link></li>
                            <li><Link href="#">Innovation</Link></li>
                            <li><Link href="#">Testimonials</Link></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="footer__widget">
                        <h6>Join Our Newsletter Now</h6>
                        <p>Get E-mail updates about our latest shop and special offers.</p>
                        <form action="#">
                            <input type="text" placeholder="Enter your mail"/>
                            <button type="submit" class="site-btn">Subscribe</button>
                        </form>
                        <div class="footer__widget__social">
                            <Link href="#"><i class="fa fa-facebook"></i></Link>
                            <Link href="#"><i class="fa fa-instagram"></i></Link>
                            <Link href="#"><i class="fa fa-twitter"></i></Link>
                            <Link href="#"><i class="fa fa-pinterest"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="footer__copyright">
                        <div class="footer__copyright__text"></div>
                        <div class="footer__copyright__payment"><img src="/images/payment-item.png" alt=""/></div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default UserFooter