import { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MyContext from './UserContext';
import { toast } from 'react-toastify';
import CartContext from './Contexts/CartContext';
import { useNavigate } from 'react-router-dom';


var Home=()=>
{

    
    const [PostData, setPostData] = useState([]);
    const [ProductData,setProductData] = useState([]);
    const [fadeLoad,setFadeLoad] = useState("display-none");
    const [loadingRage,setloadingRage] = useState("display-none");
    const {user, setUser} = useContext(MyContext);
    const {cartData, setCartData} = useContext(CartContext);
    const navigate = useNavigate();

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
            fetchPostData();
            fetchProducts();
        }, [])

        var fetchCart=async()=>
            {
                var registerData = {User:user}
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
                        }
                        else
                        {
                            setCartData([]);
                        }
                    }
                    else
                    {
                        
                    }
            }


    var ActiveClass=(e)=>
        {
            $("#featured-meals .tabs-for-opts .tabs-opts h5").removeClass("active");
            $(e.target).addClass("active");
        }

    var ActiveClass2=(e)=>
        {
            $("#featured-grocery .tabs-for-opts .tabs-opts h5").removeClass("active");
            $(e.target).addClass("active");
        }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 8
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 8
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


    const responsive2 = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      
      var fetchPostData=async()=>
        {
            try
            {
                const resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchActivePosts`,
                {
                    method:"post",
                    headers:{'Content-type':'application/json'}
                });
                if(resp.ok)
                {
                    var result = await resp.json();
                    if(result.statuscode===0)
                    {
                        setPostData();
                    }
                    else if(result.statuscode===1)
                    {
                        setPostData(result.membsdata);
                    }
                }
                else
                {
                    
                }
            }
            catch
            {
            }
        }

        var fetchProducts =async()=>
            {
                try
                {
                    const resp = await fetch(`${process.env.REACT_APP_APIURL}/ActiveProductsAll`,
                    {
                        method:"post",
                        headers:{'Content-type':'application/json'}
                    });
                    if(resp.ok)
                    {
                        var result = await resp.json();
                        if(result.statuscode===0)
                        {
                            setProductData();
                        }
                        else if(result.statuscode===1)
                        {
                            setProductData(result.membsdata);
                        }
                    }
                    else
                    {
                        
                    }
                }
                catch
                {
                }
            }

        var addtoCart=async(Post,UptoTime)=>
        {
            var a = setloadingRage("display-block");
            var b = setFadeLoad("display-block");
            const Quantity = 1;
            const User = user._id;
            var registerData = {Post,User,Quantity,UptoTime}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/add-to-cart`,
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
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.success(`Added To Cart`, {
                        position: "top-center"
                        });
                        navigate('/Cart');
                    },600);
                    fetchCart();
                }
                else if(result.statuscode===0)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Error!`, {
                            position: "top-center"
                        });
                    },600);
                }
                else if(result.statuscode===2)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Product is already is the Cart`, {
                            position: "top-center"
                        });
                    },600);
                }
            }
            else
            {
                setloadingRage("load-complete");
                var ce = setTimeout(function() {
                    var d = setloadingRage("display-none");
                    var e = setFadeLoad("display-none");
                    toast.error(`Error!`, {
                        position: "top-center"
                    });
                },600);
            }
        }

    return(

        <>
        
            
    <div className="banner py-4">
        <div className="inner-banner mx-5">
            <img className='home-bg' src="img/home-bg2.png" alt=""/>
            <div className='inner-banner-inside-con'>
                <div className='that-inside-search grid'>
                    <div className='the-left-search'>
                        <div className='upper-con-search-ryt'>
                            <div className='the-show-high'>
                                <span className='mb-4'>50% cheaper than market</span>
                            </div>
                            <div className='u-c-s-r mb-4'>
                                <span>Made with love,</span>
                                <span>Savored with interest.</span>
                            </div>
                            <h4 className='mb-4'>
                            Browse out top categories here to discover different food cuision.
                            </h4>
                        </div>
                        <div className="search-bar mb-4">
                            <div className="search-input">
                                <input type="text" placeholder="Search for Food"/>
                                <div className="search-galss-div">
                                    <div className="inside-search-glass">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-btn pt-3">
                            <button className="red-high-btn">SEARCH</button>
                        </div>
                    </div>
                    <div className='the-right-pics px-5 position-relative'>
                        <div className='animation-flying-food'>
                            <div className='food1'>
                                <img src='img/food1.png' />
                            </div>
                            <div className='food2'>
                                <img src='img/food2.png' />
                            </div>
                            <div className='food3'>
                                <img src='img/food3.png' />
                            </div>
                        </div>
                        <div className='home-bg-pic'>
                            <img src='img/mobile.png' />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    

    <div className="meal-today py-5">
        <div className="inner-meal-today mt-5 container">
            
        <div className='cru-btns'>
                        <button aria-label="Go to previous slide" class="react-multiple-carousel__arrow react-multiple-carousel__arrow--left " type="button"></button>
                        <button aria-label="Go to next slide" class="react-multiple-carousel__arrow react-multiple-carousel__arrow--right " type="button"></button>
                    </div>
            <div className="header-meal-today mt-3 mb-4">
                <div className="grid align-items-center">
                    <h5>
                        categories
                    </h5>
                </div>
                <div className='browse-h6 mt-3'>
                    <h6>
                        Browse out top categories here to discover different food cuision.
                    </h6>
                </div>
            </div>
            <div className='browse-cat-upperlayer'>
                <Carousel responsive={responsive}>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-1.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Pizza
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-2.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Chicken
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-3.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Burger
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-9.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Meat
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-10.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Paneer
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-11.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Hotdog
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-16.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Pasta
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-17.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Maggie
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-18.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Momos
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-19.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Salad
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='thecards-cat'>
                        <div className='card-img'>
                            <img src={`img/p-20.png`}/>
                        </div>
                        <div className='card-body'>
                            <div className='heading py-2'>
                                <h4>
                                    Biryani
                                </h4>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    </div>

    <div className='section-have-s py-5' id='featured-meals'>
        <div className='inside-have-s container pb-4'>
            <div className='heading-have-s'>
                <div className="grid">
                    <div className='the-head-t'>
                        <h4>
                           Featured Meals
                        </h4>
                        <div className='c-loader'>
                            <div className='c-loader-line'></div>
                        </div>
                    </div>
                    <div className='tabs-for-opts flex justify-content-end align-items-end'>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass(e)}>
                            <h5 className='active'>All</h5>
                        </div>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass(e)}>
                            <h5>Non-Veg</h5>
                        </div>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass(e)}>
                            <h5>Veg</h5>
                        </div>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass(e)}>
                            <h5>Gluten free</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='lower-body-have-s grid mt-3'>
                {
                    PostData.length>0 && ProductData.length>0?
                    <>
                        {
                            PostData?.map((data, i) =>
                                <>
                                    <div className='thecards' key={i}>
                                        <div className='card-img-outerlay'>
                                            <div className='card-img' style={{ "backgroundImage": ` url(/ProductUploads/${ProductData?.filter((e) => e._id == data.Product)[0].Image})` }}>

                                            </div>
                                            {
                                                user?
                                                <>
                                                    <div className='add-to-cart-btn' onClick={()=> addtoCart(data._id, data.UptoTime)}>
                                                        <i class="fa-solid fa-plus"></i>
                                                    </div>
                                                </>:null
                                            }
                                            
                                        </div>
                                        <div className='card-body p-3'>
                                            <div className='heading'>
                                                <h4>
                                                    {ProductData?.filter((e) => e._id == data.Product)[0].Title}
                                                </h4>
                                            </div>
                                            <div className='card-details pb-2'>
                                                <h5>
                                                    Collect Time:&nbsp;
                                                    {(new Date(data.FromTime).getHours() % 12 || 12).toString().padStart(2, '0')}:{(new Date(data.FromTime).getMinutes()).toString().padStart(2, '0')}{new Date(data.FromTime).getHours() >= 12 ? 'PM' : 'AM'}
                                                    -
                                                    {(new Date(data.UptoTime).getHours() % 12 || 12).toString().padStart(2, '0')}:{(new Date(data.UptoTime).getMinutes()).toString().padStart(2, '0')}{new Date(data.UptoTime).getHours() >= 12 ? 'PM' : 'AM'}
                                                </h5>
                                                <div className="t-p-p-g-reviewnprice">
                                                    <span><i class="fa-solid fa-star"></i> 4.4</span>
                                                    <h3>CAD${ProductData?.filter((e) => e._id == data.Product)[0]?.Price}</h3>
                                                </div>
                                            </div>
                                            <div className='cards-address mt-4'>
                                                <h5>
                                                    <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                    :
                    null
                }
                
                
            </div>
        </div>
    </div>

    <div className='section-have-s py-5' id='featured-grocery'>
        <div className='inside-have-s container py-4'>
            <div className='heading-have-s'>
                <div className="grid">
                    <div className='the-head-t'>
                        <h4>
                           Featured Groceries
                        </h4>
                        <div className='c-loader'>
                            <div className='c-loader-line'></div>
                        </div>
                    </div>
                    <div className='tabs-for-opts flex justify-content-end align-items-end'>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass2(e)}>
                            <h5 className='active'>All</h5>
                        </div>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass2(e)}>
                            <h5>Non-Veg</h5>
                        </div>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass2(e)}>
                            <h5>Veg</h5>
                        </div>
                        <div className='tabs-opts' onClick={(e)=> ActiveClass2(e)}>
                            <h5>Gluten free</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='lower-body-have-s grid mt-3'>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/basket.jpeg)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/basket.jpeg)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/basket.jpeg)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/basket.jpeg)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <div className='section-have-s py-5' id='featured-meals'>
        <div className='inside-have-s container position-relative py-4'>
            <div className='see-all-f-res'>
                <h6>See All <i class="fa-solid fa-right-long"></i></h6>
            </div>
            <div className='heading-have-s no-border'>
                <div className="grid">
                    <div className='the-head-t'>
                        <h4>
                           Featured Restaurants
                        </h4>
                        <div className='browse-h6'>
                            <h6>Find nearby popular Restaurants.</h6>
                        </div>
                        <div className='c-loader'>
                            <div className='c-loader-line'></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='f-res mt-3'>
            <Carousel responsive={responsive2}>

                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/vp-1.png)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/vp-1.png)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/vp-1.png)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/vp-1.png)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/vp-1.png)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>
                <div className='thecards'>
                    <div className='card-img-outerlay'>
                        <div className='card-img' style={{"backgroundImage":" url(../img/vp-1.png)"}}>
                        </div>
                    </div>
                    <div className='card-body p-3'>
                        <div className='heading'>
                            <h4>
                                Grocery Box
                            </h4>
                        </div>
                        <div className='card-details pb-2'>
                            <h5>
                            Chicken quesadilla, avocado, pineapple
                            </h5>
                            {/* <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>Food Bank
                            </h5>
                            <h5>
                                <span><i class="fa-solid fa-phone"></i> </span>+1 234-567-7899
                            </h5> */}
                        </div>
                        <div className='cards-address mt-4'>
                            <h5>
                                <span><i class="fa-solid fa-location-dot"></i> </span>205 Bvl Humer College, Toronto, Ontario
                            </h5>
                        </div>
                    </div>
                </div>

            </Carousel>

            </div>
        </div>
    </div>
    


        {/* <div className='faqs py-5 mb-5'>
            <div className='container'>
                <div className='faq-header mb-5'>
                    <h4>
                        FAQ
                    </h4>
                </div>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}



                    <div className="loading-line">
                    <div className={`loading-range ${loadingRage}`}>

                    </div>
                </div>

                <div className={`fade-screen ${fadeLoad}`}>

                </div>


        </>

    )

}

    
export default Home;