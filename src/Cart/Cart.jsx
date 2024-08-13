import { useContext, useEffect, useState } from "react";
import CartContext from "../Contexts/CartContext";
import ProductContext from "../Contexts/ProductContext";
import PostContext from "../Contexts/PostContext";
import MyContext from "../UserContext";
import { Link, useNavigate } from "react-router-dom";



var Cart=()=>
    {
        const {cartData, setCartData} = useContext(CartContext);
        const {user, setUser} = useContext(MyContext);
        const navigate = useNavigate();
        const [fadeLoad,setFadeLoad] = useState("display-flex");
        const [loadingRage,setloadingRage] = useState("display-block");
        const [PostsIDs, setPostsIDs] = useState([]);
        const [ProductsIDs, setProductsIDs] = useState([]);
        const [PostData, setPostData] = useState([]);
        const [ProductData, setProductData] = useState([]);
        const [subTotal, setSubTotal] = useState(0);
        const [platformFee, setplatformFee] = useState(1.60);
        const [taxPercent, setTaxPercent] = useState(0.13);
        const [taxAmount, settaxAmount] = useState(0);
        const [totalBill, setTotalBill] = useState(0);

        
        useEffect(()=>
        {
            window.scrollTo({top: 0, behavior: 'instant'});
        }, [])

        useEffect(()=>
        {
            if(user)
            {
                fetchCart();
            }
        }, [user])


        useEffect(()=>
        {
            if(PostsIDs.length>0)
            {
                fetchPosts();
            }
        }, [PostsIDs])

        useEffect(()=>
        {
            if(ProductsIDs.length>0)
            {
                fetchProducts();
            }
        }, [ProductsIDs])

        useEffect(()=>
        {
            if(ProductData.length>0)
            {
                CalcTotal();
            }
        }, [ProductData])

        var CalcTotal=async()=>
        {
            const sub = ProductData[0].Price;
            const preTotal = sub + platformFee;
            const tax_amount = preTotal*taxPercent;
            const tax_rounded = Math.round(tax_amount * 100) / 100;
            const Total = preTotal+tax_rounded;
            console.log(Total);
            setSubTotal(sub);
            settaxAmount(tax_rounded);
            setTotalBill(Total);
        }

        var Checkout=async()=>
        {
            var registerData = {Price:totalBill,Product:ProductData};
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/create-checkout-session`,
            {
                method:"post",
                body:JSON.stringify(registerData),
                headers:{'Content-type':'application/json'}
            })
            if(resp.ok)
            {
                var result = await resp.json();
                if(result.statuscode===1)
                    {
                        window.location.replace(result.session);
                    }
            }

        }

        var fetchCart=async()=>
            {
                var registerData = {User:user._id};
                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/cart-data`,
                    {
                        method:"post",
                        body:JSON.stringify(registerData),
                        headers:{'Content-type':'application/json'}
                    })
            
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===1)
                        {
                            setCartData(result.membsdata);
                            const ids = result.membsdata.map(item => item.Post);
                            setPostsIDs(ids);
                        }
                        else
                        {
                            setCartData([]);
                            setloadingRage("load-complete");
                            var ce = setTimeout(function() {
                                var d = setloadingRage("display-none");
                                var e = setFadeLoad("display-none");
                            },600);
                        }
                    }
                    else
                    {
                        
                    }
            }

            var fetchPosts=async()=>
            {
                var registerData = {Post:PostsIDs}
                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/post-data`,
                    {
                        method:"post",
                        body:JSON.stringify(registerData),
                        headers:{'Content-type':'application/json'}
                    })
            
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===1)
                        {
                            setPostData(result.membsdata);
                            const ids = result.membsdata.map(item => item.Product);
                            setProductsIDs(ids);
                        }
                        else
                        {
                            setloadingRage("load-complete");
                            var ce = setTimeout(function() {
                                var d = setloadingRage("display-none");
                                var e = setFadeLoad("display-none");
                            },600);
                        }
                    }
                    else
                    {
                        
                    }
            }
        
            
            var fetchProducts=async()=>
            {
                var registerData = {Products:ProductsIDs}
                    var resp = await fetch(`${process.env.REACT_APP_APIURL}/product-data`,
                    {
                        method:"post",
                        body:JSON.stringify(registerData),
                        headers:{'Content-type':'application/json'}
                    })
            
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===1)
                        {
                            setProductData(result.membsdata);
                            setloadingRage("load-complete");
                            var ce = setTimeout(function() {
                                var d = setloadingRage("display-none");
                                var e = setFadeLoad("display-none");
                            },600);
                        }
                    }
                    else
                    {
                        
                        setloadingRage("load-complete");
                        var ce = setTimeout(function() {
                            var d = setloadingRage("display-none");
                            var e = setFadeLoad("display-none");
                        },600);
                    }
            }

    return(
    <>
    <div className="thecartout">
        <div className="py-5 mb-5">
            <div className="container">
                {
                    cartData.length>0?
                    <>
                        <div className="the-cart">
                            <div className="inner-cart">
                                <div className="left-side-cart-detail col-lg-8">

                                    <div className="l-s-c-d-upper-opts">
                                        <div className='section-have-s' id='featured-meals'>
                                            <div className='inside-have-s position-relative pt-4'>
                                                <div className='heading-have-s no-border'>
                                                    <div className="grid">
                                                        <div className='the-head-t'>
                                                            <h4>
                                                                Your Cart
                                                            </h4>
                                                            <div className='c-loader'>
                                                                <div className='c-loader-line'></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="thecart-items">
                                            {
                                                ProductData?.length > 0 ?
                                                    <>
                                                        <div className="inner-cart-items">

                                                            {
                                                                ProductData.map((data, i) =>

                                                                    <div className="cart-items-card" key={i}>
                                                                        <div className="cart-card-inner">
                                                                            <div className="flex align-items-center gap-3">
                                                                                <div className="the-cart-item-photo">
                                                                                    <img src={`/ProductUploads/${data.Image}`} alt="" srcset="" />
                                                                                </div>
                                                                                <div className="theleft-cartcard-deatils">
                                                                                    <h5>
                                                                                        {data.Title}
                                                                                    </h5>
                                                                                    <h6>
                                                                                        ${data.Price} x 1
                                                                                    </h6>
                                                                                </div>

                                                                            </div>
                                                                            <div className="theright-cartcard-deatils">
                                                                                <h4>
                                                                                    ${data.Price}
                                                                                </h4>
                                                                                <div className="remove-the-item-cart">
                                                                                    <i class="fa-solid fa-trash-can"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }

                                                        </div>
                                                        <div className="empty-the-cart pt-5 pb-3">
                                                            <h5>Remove All</h5>
                                                        </div>
                                                    </>
                                                    : null
                                            }
                                        </div>

                                    </div>

                                </div>
                                <div className="right-side-cart-detail col-lg-4 mt-4">
                                    <div className="the-cart-info">
                                        <div className="bill-details pb-2">
                                            <h5>Order Summary</h5>
                                        </div>
                                        <div className="indetails-bill mt-4">
                                            <div className="bill-flex">
                                                <h5>Sub Total</h5>
                                                <h5 className="theprice-bill">${subTotal}</h5>
                                            </div>
                                            <div className="bill-flex">
                                                <h5>Platform Fee</h5>
                                                <h5 className="theprice-bill">+ ${platformFee}</h5>
                                            </div>
                                            <div className="bill-flex">
                                                <h5>Tax (13%)</h5>
                                                <h5 className="theprice-bill">${taxAmount}</h5>
                                            </div>
                                            <div className="totalbill-cart">
                                                <h5>Total</h5>
                                                <h5 className="theprice-bill">${totalBill}</h5>
                                            </div>
                                            <button className="checkout-btn" onClick={Checkout}>Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>:
                    <>
                        <div className="whole-screen-flex">
                            {/* <h4>Shopping Cart</h4> */}
                            <div className="text-center">
                            <h3>Your Cart Is Currently Empty!</h3>
                            <p className="m-0">Before proceed to checkout you need to add one meal/grocery in your shopping cart.</p>
                            <p>Click on 'Return To Shop' to find your mela/grocery.</p>
                            </div>
                            <Link className="return-shop-btn" to={'/'}>Return To Shop</Link>
                            <div className="the-open-empty-cart">
                            <i class="fa-brands fa-opencart"></i>
                            </div>
                        </div>
                    </>
                }
                    


            </div>
        </div>
    </div>

    <div className="loading-line">
        <div className={`loading-range ${loadingRage}`}>

        </div>
    </div>

    <div className={`fade-screen ${fadeLoad}`}>
    <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
        <circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
        <circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
        <circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
        <circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
    </svg>
    </div>
    </>
    )
}


export default Cart;