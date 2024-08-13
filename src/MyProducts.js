import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "./UserContext";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import $ from 'jquery';
import TheDropDown from "./The-Drop-Down";
import PostPopUp from "./Post-Popup";



var MyProducts =()=>
    {

        const [ProductData,setProductData] = useState([]);
        const [ShowProductData,setShowProductData] = useState([]);
        const [ProDataOptOpen,setProDataOptOpen] = useState(false);
        const [PostCall,setPostCall] = useState(false);
        const [PostID,setPostID] = useState();
        const [SortByTitle,setSortByTitle] = useState(false);
        const [ProDataOptOpenVisible,setProDataOptOpenVisible] = useState(false);
        const {user, setUser} = useContext(MyContext);
        const navigate = useNavigate();

        useEffect(()=>
        {

            if(!PostCall)
                {
                    document.title = 'My Products | Square Meal';
                }

        }, [PostCall])

        useEffect(()=>
            {
                document.title = 'My Products | Square Meal';
            }, [])

        useEffect(()=>
        {
            if(PostCall)
                {
                    $('body').css('overflow', 'hidden');
                }
                else
                {
                    $('body').css('overflow', 'auto')
                }
        }, [PostCall])

        useEffect(()=>
        {
            if(user)
                {
                    fetchProducts();
                }
        }, [user])
        
        var fetchProducts =async()=>
            {
                try
                {
                    var data = {id:user._id};
                    const resp = await fetch(`${process.env.REACT_APP_APIURL}/fetch-products-supporters`,
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
                            setShowProductData();
                        }
                        else if(result.statuscode===1)
                        {
                            setProductData(result.membsdata);
                            setShowProductData(result.membsdata);
                            console.log(result.membsdata)
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


        $(window).on( "click", function(e) {
            if(ProDataOptOpen)
            {
                setProDataOptOpen(false);
                // setProDataOptOpenVisible(0);
                $(`.opts-for-pro-details`).removeClass("true");
                $(`.opts-for-pro-details`).addClass("false");
            }
            } );

            useEffect(()=>
            {
                if(!ProDataOptOpen)
                    {
                        window.setTimeout(function() {
                            console.log("yeh to chal")
                            setProDataOptOpenVisible(0);
                      }, 600);
                    }
            }, [ProDataOptOpen])


            useEffect(()=>
            {
                if(SortByTitle)
                {
                    if(ProductData && ProductData.length>0)
                    {
                        const sortedProducts = [...ShowProductData].sort((a, b) => a.Title.localeCompare(b.Title));
                        setShowProductData(sortedProducts);
                    }
                }
                else
                {
                    setShowProductData(ProductData);
                }

            }, [SortByTitle])

        return(

            <>
            

            <div className="myproducts-supporter" id="supporter-view">
                <div className="inside-pannel-dash p-5">
                    <div className="intermost-p-d">
                        <div className="m-p-s-head">
                            <div className="flex justify-content-between align-items-center">
                                <div className="m-p-s-heading">
                                    <h3>
                                        Products
                                    </h3>
                                </div>
                                <div className="for-new-pro">
                                    <Link className="newitem-btn" to={`/Supporter/Add-Product`}><i class="fa-solid fa-plus"></i> New Item</Link>
                                </div>
                            </div>
                        </div>
                        <div className="m-p-s-middle-bar mt-5">
                            <div className="m-p-s-middle-bar-in">
                                <div className="flex align-items-center gap-4">
                                    <div className="search-4-mypros- position-relative">
                                        <input type="text" placeholder="Search"/>
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <div className="select-type-of-pro-data">
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={30}
                                            // label="Age"
                                            // onChange={handleChange}
                                            >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty dwcdw fsvfs</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>  
                                    </div>
                                </div>
                            </div>
                        </div>


                    {
                        ShowProductData?.length>0?
                        <>
                            <div className="m-p-d-table-body mt-5">
                                <div className="m-p-d-in-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Photo</td>
                                                <td onClick={()=>
                                                    {
                                                        if(SortByTitle)
                                                            {
                                                                setSortByTitle(false);
                                                            }
                                                            else
                                                            {
                                                                setSortByTitle(true);
                                                            }
                                                    }
                                                } className="title-thead"><span>Title 
                                                    {
                                                        SortByTitle?
                                                        <>
                                                            &nbsp;<i class="fa-solid fa-caret-up"></i>
                                                        </>
                                                        :
                                                        <>
                                                            &nbsp;<i class="fa-solid fa-caret-down"></i>
                                                        </>
                                                    }
                                                    </span>
                                                </td>
                                                <td>Price</td>
                                                <td>Type</td>
                                                <td>Status</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ShowProductData?.map((data, i) =>
                                                    <>
                                                    {/* <tr key={i}>
                                                        <td><img src={`/ProductUploads/${data.Image}`} /></td>
                                                        <td className="title-table-bold position-relative">
                                                            
                                                        <div className="td-inside-title">
                                                            <span className="position-relative the-a"  onClick={(e)=>{
                                                        if(ProDataOptOpen)
                                                        {
                                                            window.setTimeout(function() {
                                                            setProDataOptOpen(false);
                                                        }, 1);
                                                        }
                                                        else
                                                        {
                                                            window.setTimeout(function() {
                                                                setProDataOptOpen(true);
                                                                setProDataOptOpenVisible(true);
                                                            }, 1);
                                                        }
                                                    }}>{data.Title}
                                            
                                            
                                                            </span>
                                                            
                                                    {
                                                        ProDataOptOpenVisible?
                                                        <>
                                                         <div className={`opts-for-pro-details ${ProDataOptOpen}`}>
                                                            <div className='inn-o-f-p-o-a'>
                                                                <div className='body-o-f-p-o-a'>
                                                                    <div className='in-flex justify-content-evenly align-items-center'>
                                                                        <div className='the-ops flex justify-content-around align-items-center'>
                                                                            <span>Post</span>
                                                                            <BackupOutlinedIcon></BackupOutlinedIcon>
                                                                        </div>
                                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/Add-Product');}}>
                                                                            <span>Update</span>
                                                                            <CreateOutlinedIcon></CreateOutlinedIcon>
                                                                        </div>
                                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/Add-Product');}}>
                                                                            <span>Delete</span>
                                                                            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                                                                        </div>
                                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/Add-Product');}}>
                                                                            <span>Details</span>
                                                                            <InfoOutlinedIcon></InfoOutlinedIcon>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </>:null
                                                    }

                                                   

                                                        </div>
                                                            
                                                        

                                                        </td>
                                                        <td>CAD {data.Price}</td>
                                                        <td>{data.ProductType}</td>
                                                        <td>{
                                                                data.isActive?
                                                                "Active":
                                                                "Not Active"
                                                            }</td>
                                                    </tr> */}
                                                    <tr key={i}>
                                                        <td><img src={`/ProductUploads/${data.Image}`} /></td>
                                                        <td className="title-table-bold position-relative">
                                                            
                                                        <div className="td-inside-title">
                                                            <span className="position-relative the-a"  onClick={(e)=>{
                                                        if($(`#o-f-p-d${i}`).hasClass("true"))
                                                        {
                                                            $(`#o-f-p-d${i}`).removeClass("true");
                                                            $(`#o-f-p-d${i}`).addClass("false");
                                                            window.setTimeout(function() {
                                                                setProDataOptOpen(false);
                                                        }, 1);
                                                            window.setTimeout(function() {
                                                                setProDataOptOpenVisible(0);
                                                        }, 500);
                                                        }
                                                        else
                                                        {
                                                            window.setTimeout(function() {
                                                                setProDataOptOpen(true);
                                                                setProDataOptOpenVisible(i+1);
                                                                $(`#o-f-p-d${i}`).removeClass("false");
                                                                $(`#o-f-p-d${i}`).addClass("true");
                                                            }, 1);
                                                        }
                                                    }}>{data.Title}
                                            
                                            
                                                            </span>
                                                            
                                                         <div className={`opts-for-pro-details false`} id={`o-f-p-d${i}`}>
                                                            {/* <div className='inn-o-f-p-o-a'>
                                                                <div className='body-o-f-p-o-a'>
                                                                    <div className='in-flex justify-content-evenly align-items-center'>
                                                                        <div className='the-ops flex justify-content-around align-items-center'>
                                                                            <span>Post</span>
                                                                            <BackupOutlinedIcon></BackupOutlinedIcon>
                                                                        </div>
                                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/Add-Product');}}>
                                                                            <span>Update</span>
                                                                            <CreateOutlinedIcon></CreateOutlinedIcon>
                                                                        </div>
                                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/Add-Product');}}>
                                                                            <span>Delete</span>
                                                                            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                                                                        </div>
                                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/Add-Product');}}>
                                                                            <span>Details</span>
                                                                            <InfoOutlinedIcon></InfoOutlinedIcon>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}

                                                            {
                                                                ProDataOptOpenVisible===i+1?
                                                                <>
                                                                <TheDropDown isActive={data.isActive} id={data._id} theID={(e)=> setPostID(e)} PostOpen={(e)=> setPostCall(e)}></TheDropDown>
                                                                </>:null
                                                            }

                                                            
                                                        </div>

                                                   

                                                        </div>
                                                            
                                                        

                                                        </td>
                                                        <td>CAD {data.Price}</td>
                                                        <td>{data.ProductType}</td>
                                                        <td>{
                                                                data.isActive?
                                                                "Active":
                                                                "Not Active"
                                                            }</td>
                                                    </tr>
                                                    </>
                                                )
                                            }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="no-data-text text-center mt-5 py-5">
                                <div className="in-n-d-t">
                                    <h2>
                                        No Data
                                    </h2>
                                </div>
                            </div>
                        </>
                    }
                    </div>
                </div>
            </div>

            {
                PostCall?
                <>
                    <PostPopUp closeCommand={()=>setPostCall()} ID={PostID}></PostPopUp>
                </>
                :null
            }


            </>

        )
    }


export default MyProducts;