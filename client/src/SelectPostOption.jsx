import { useContext, useEffect, useState } from "react";
import TitleContext from "./Post-Title-Context";
import $ from 'jquery';
import { useLocation, useNavigate } from "react-router-dom";
import MyContext from "./UserContext";




var SelectPostOption=(prop)=>
    {
        const {title, setTitle }= useContext(TitleContext);
        const [SelectedArray, setSelectArray] = useState([]);
        const [ProductData, setProductData] = useState([]);
        const {user, setUser} = useContext(MyContext);
        const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from || '/';

        useEffect(()=>
            {
                var a = "Select the product to post"
                setTitle(a);
            }, [])


        useEffect(()=>
        {
            if(user)
            {
                fetchProducts();
            }
        }, [user])


        var selectPost=(id)=>
        {
            if(!SelectedArray)
            {
                setSelectArray(prevArray => [...prevArray, id]);
            }
            else if(SelectedArray.includes(id))
            {
                setSelectArray(prevArray => prevArray.filter(e => e !== id));
            }
            else
            {
                setSelectArray(prevArray => [...prevArray, id]);
            }
        }

        var fetchProducts =async()=>
            {
                try
                {
                    var data = {id:user._id};
                    const resp = await fetch(`${process.env.REACT_APP_APIURL}/notactiveproducts`,
                    {
                        method:"post",
                        body:JSON.stringify(data),
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


        var Select_Unselect=async(e)=>
        {
            if(e==="Unselect")
            {
                setSelectArray([])
            }
            else if(e==="Select")
            {
                var z = setSelectArray([]);
                for(var i=0;i<ProductData.length;i++)
                {
                    selectPost(ProductData[i]._id);
                }
            }
        }


        return(
            <>
                <div className="outermost-available overflow-y-auto">
                    <div className="select-post-all-availables">
                        <div className="inner-s-p-a-a">
                            <div className="inner-grid-s-p-a-a">
                                {
                                    ProductData?.length>0?
                                    <>
                                    {
                                        ProductData?.map((data, i) =>
                                        <>
                                            <div className={`outermost-i-g-s-p ${SelectedArray?.includes(data._id)?"Active":''}`} key={i} onClick={(e) => {
                                                selectPost(data._id);
                                            }}>
                                                <div className="available-selections-card">
                                                    <div className="thehead-a-s-c">
                                                        <img src={`/ProductUploads/${data.Image}`} alt="" />
                                                        <span className="the-check">

                                                        </span>
                                                    </div>
                                                    <div className="inner-a-s-c">
                                                        <div class="t-p-p-g-themain">
                                                            <div class="t-p-p-g-forupper">
                                                                <h4>{data.Title}</h4>
                                                                <div class="t-p-p-g-reviewnprice">
                                                                    <span><i class="fa-solid fa-star"></i> 4.4</span>
                                                                    <h3>CA${data.Price}</h3>
                                                                </div>
                                                            </div>
                                                        </div>
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
                </div>

                <div className="available-post-footer">
                    <div className="theactive-btns-section">
                        <div className="theouter-flex-a-p-f">
                            <div className="left-a-p-f-btns">
                            {
                                    SelectedArray?.length===ProductData?.length?
                                    <>
                                        <button className="a-p-f-next-btn active" onClick={()=>Select_Unselect("Unselect")}>
                                            Unselect All
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className="a-p-f-next-btn active" onClick={()=>Select_Unselect("Select")}>
                                            Select All
                                        </button>
                                    </>
                                }
                            </div>
                            <div className="t-a-b-s-flex">
                                <button className="a-p-f-next-btn active" onClick={()=>navigate(-1)}>
                                    Discard
                                </button>
                                {
                                    SelectedArray?.length>0?
                                    <>
                                        <button className="a-p-f-next-btn active">
                                            Next
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className="a-p-f-next-btn disabled">
                                            Next
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }


export default SelectPostOption;