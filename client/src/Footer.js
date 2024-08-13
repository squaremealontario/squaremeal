import { Link } from "react-router-dom";


var Footer=()=>
{


    return(

        <>
        
            
            <footer className="py-5">
                <div className="footer-section container">
                    <div className="footer-sections grid py-4">
                        <div className="footer-about-us">
                            <h3>Square Meal</h3>
                            <p className="mt-2">
                            Welcome to our online order website!<br/>
                            Here, you can browse our wide selection of products and place orders from the comfort of your own home.
                            </p>
                            <div className="q-social mt-4">
                                <ul className="flex justify-content-between">
                                    <li>
                                        <Link ><i class="fa-brands fa-facebook-f"></i></Link>
                                    </li>
                                    <li>
                                        <Link ><i class="fa-brands fa-instagram"></i></Link>
                                    </li>
                                    <li>
                                        <Link ><i class="fa-brands fa-x-twitter"></i></Link>
                                    </li>
                                    <li>
                                        <Link ><i class="fa-brands fa-tiktok"></i></Link>
                                    </li>
                                    <li>
                                        <Link ><i class="fa-brands fa-threads"></i></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-sm-sec grid">
                            <div className="footer-sm-sections">
                                <div className="f-sm-s-head">
                                    <h4>Organization</h4>
                                </div>
                                <div className="f-sm-links mt-3">
                                    <ul>
                                        <li>
                                            <Link>About us</Link>
                                        </li>
                                        <li>
                                            <Link>Donate <span><i class="fa-solid fa-hand-holding-heart"></i></span></Link>
                                        </li>
                                        <li>
                                            <Link>Contact us</Link>
                                        </li>
                                        <li>
                                            <Link>Career</Link>
                                        </li>
                                        <li>
                                            <Link>FAQs</Link>
                                        </li>
                                        <li>
                                            <Link>Blogs</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-sm-sections">
                                <div className="f-sm-s-head">
                                    <h4>Account</h4>
                                </div>
                                <div className="f-sm-links mt-3">
                                    <ul>
                                        <li>
                                            <Link>Log in</Link>
                                        </li>
                                        <li>
                                            <Link>Sign up</Link>
                                        </li>
                                        <li>
                                            <Link>Cart</Link>
                                        </li>
                                        <li>
                                            <Link>My orders</Link>
                                        </li>
                                        <li>
                                            <Link>My Profile</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-sm-sections">
                                <div className="f-sm-s-head">
                                    <h4>Quick Links</h4>
                                </div>
                                <div className="f-sm-links mt-3">
                                    <ul>
                                        <li>
                                            <Link>Student register</Link>
                                        </li>
                                        <li>
                                            <Link>Become a supporter</Link>
                                        </li>
                                        <li>
                                            <Link>View all Meals <i class="fa-solid fa-arrow-right"></i></Link>
                                        </li>
                                        <li>
                                            <Link>View all Groceries <i class="fa-solid fa-arrow-right"></i></Link>
                                        </li>
                                        <li>
                                            <Link>View all Restaurants <i class="fa-solid fa-arrow-right"></i></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                            
                    </div>
                    <div id="copyright" className="pt-5 text-center">
                        <h5>
                        &copy; Copyright 2024 Square Meal. All rights Reserved.
                        </h5>
                    </div>
                </div>
            </footer>

        </>
    )


}

    
export default Footer;