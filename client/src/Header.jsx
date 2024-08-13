import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "./UserContext";
import CartContext from "./Contexts/CartContext";

var Header = (prop) =>
{
    const navigate = useNavigate();
    const {user,setUser} = useContext(MyContext);
    const {cartData, setCartData} = useContext(CartContext);
    

    return(

        <>
          
          <header id="site-header">
                <div className="px-5 head">
                    <div className="align-items-center px-5 nav-section">
                        <div className="the-left-nav-con flex align-items-center">
                            <Link className="logo-pic" to={`/`}><img src="/img/Logo.jpg" alt=""/></Link>
                                <Link className="red-high-btn" to={`/Login`}><i class="fa-solid fa-location-dot"></i>&nbsp; Location</Link>
                        </div>
                        <div className="nav-bar the-center-nav-con">
                            <ul>
                                <li className="nav-btns"><a href="">About us</a></li>
                                <li className="nav-btns"><a href="">Meal</a></li>
                                <li className="nav-btns"><a href="">Grocery</a></li>
                                <li className="nav-btns"><a href="">Donate <i class="fa-solid fa-hand-holding-heart"></i></a></li>
                                <li className="nav-btns"><a href="">Contact</a></li>
                            </ul>
                        </div>
                        <div className="the-right-nav-con">
                            <div className="right-nav-btns">
                                <div className="cart-icon" onClick={()=> navigate('/Cart')}>
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    <span>{cartData?.length}</span>
                                </div>
                                <div className="vertical-line-1-4">

                                </div>
                                {
                                    user?
                                    <>
                                    <Link className="account-nav-btn" to={`/Login`}>
                                    <div className="my-account-btn"><img src={`/UserProfiles/${user.Picture?user.Picture:'noprofile.jpg'}`} alt="" /></div> <span className="ms-2">Account</span>
                                    </Link>
                                    </>
                                    :
                                    <Link className="login-btn" to={`/Login`}>Login</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            
        </>

    )

}

export default Header;