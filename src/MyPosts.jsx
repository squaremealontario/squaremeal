import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import MyContext from "./UserContext";
import TitleContext from "./Post-Title-Context";



        var TheCard=(prop)=>
        {
            return(
                <>
                    <div className="t-p-p-g-thepost-card">
                        <div className="t-p-p-g-img">
                            <img src={`/ProductUploads/${prop.Product? prop.Product.Image:'noimage.jpg'}`} alt="" />
                            <span className="theqty-label">{prop.data.RemainingQuantity} left</span>
                            <span className="thethree-dots-opts"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                        </div>
                        <div className="t-p-p-g-themain">
                            <div className="t-p-p-g-forupper">
                                <h4>Baked Goods</h4>
                                <h6>Collect Time:&nbsp;
                                    {(new Date(prop.data.FromTime).getHours() % 12 || 12).toString().padStart(2, '0')}:{(new Date(prop.data.FromTime).getMinutes()).toString().padStart(2, '0')}{new Date(prop.data.FromTime).getHours() >= 12 ? 'PM' : 'AM'}
                                     - 
                                    {(new Date(prop.data.UptoTime).getHours() % 12 || 12).toString().padStart(2, '0')}:{(new Date(prop.data.UptoTime).getMinutes()).toString().padStart(2, '0')}{new Date(prop.data.UptoTime).getHours() >= 12 ? 'PM' : 'AM'}</h6>
                                <h6>Collect Date: {(new Date(prop.data.FromTime).getDate()).toString().padStart(2, '0')}/{(new Date(prop.data.FromTime).getMonth()+1).toString().padStart(2, '0')}/{new Date(prop.data.FromTime).getFullYear()}</h6>
                                <div className="t-p-p-g-reviewnprice">
                                    <span><i class="fa-solid fa-star"></i> 4.4</span>
                                    <h3>CA${prop.Product?.Price}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }


        var TheScheduledCard=(prop)=>
        {
            return(
                <>
                    <div className="t-p-p-g-thepost-card">
                        <div className="t-p-p-g-img">
                            <img src={`/ProductUploads/${prop.Product ? prop.Product.Image:'noimage.jpg'}`} alt="" />
                            <span className="theqty-label">{prop.data.RemainingQuantity} left</span>
                            <span className="thethree-dots-opts"><i class="fa-solid fa-ellipsis-vertical"></i></span>
                            <span className="scheduled-t-p-p-g"><h6>Scheduled For&nbsp;
                                {
                                    (new Date(prop.data.AutomaticTime).getDate())>new Date().getDate()?
                                    <>
                                        {(new Date(prop.data.AutomaticTime).getDate()).toString().padStart(2, '0')}/{(new Date(prop.data.AutomaticTime).getMonth()+1).toString().padStart(2, '0')}/{new Date(prop.data.AutomaticTime).getFullYear()}
                                    </>
                                    :
                                    <>
                                        {(new Date(prop.data.AutomaticTime).getHours() % 12 || 12).toString().padStart(2, '0')}:{(new Date(prop.data.AutomaticTime).getMinutes()).toString().padStart(2, '0')} {new Date(prop.data.AutomaticTime).getHours() >= 12 ? 'PM' : 'AM'} Today
                                    </>
                                }</h6></span>
                        </div>
                        <div className="t-p-p-g-themain">
                            <div className="t-p-p-g-forupper">
                                <h4>Baked Goods</h4>
                                <h6>Collect Time:&nbsp;
                                    {(new Date(prop.data.FromTime).getHours() % 12 || 12).toString().padStart(2, '0')}:{(new Date(prop.data.FromTime).getMinutes()).toString().padStart(2, '0')}{new Date(prop.data.FromTime).getHours() >= 12 ? 'PM' : 'AM'}
                                     - 
                                    {(new Date(prop.data.UptoTime).getHours() % 12 || 12).toString().padStart(2, '0')}:{(new Date(prop.data.UptoTime).getMinutes()).toString().padStart(2, '0')}{new Date(prop.data.UptoTime).getHours() >= 12 ? 'PM' : 'AM'}</h6>
                                <h6>Collect Date: {(new Date(prop.data.FromTime).getDate()).toString().padStart(2, '0')}/{(new Date(prop.data.FromTime).getMonth()+1).toString().padStart(2, '0')}/{new Date(prop.data.FromTime).getFullYear()}</h6>
                                <div className="t-p-p-g-reviewnprice">
                                    <span><i class="fa-solid fa-star"></i> 4.4</span>
                                    <h3>CA${prop.Product?.Price}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

                
        function CustomTabPanel(props) {
            const { children, value, index, ...other } = props;

            return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
            );
        }

        CustomTabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
        };

        function a11yProps(index) {
            return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
            };
        }


var MyPosts=()=>
    {
        
        const [value, setValue] = useState(0);
        const [PostData, setPostData] = useState([]);
        const [ActivePostData, setActivePostData] = useState([]);
        const [ScheduledPostData, setScheduledPostData] = useState([]);
        const [ProductData,setProductData] = useState([]);
        const {user, setUser} = useContext(MyContext);
        const {title, setTitle} = useContext(TitleContext);


        const handleChange = (event, newValue) => {
        setValue(newValue);
        };

        useEffect(()=>
        {
            document.title = 'My Post | Square Meal';
        }, [])

        useEffect(()=>
        {
            if(user)
            {
                fetchPostData();
                fetchProducts();
            }
        }, [user])

        var fetchPostData=async()=>
        {
            try
            {
                var data = {id:user._id};
                const resp = await fetch(`${process.env.REACT_APP_APIURL}/fetchposts`,
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
                        setPostData();
                    }
                    else if(result.statuscode===1)
                    {
                        setPostData(result.membsdata);
                        setActivePostData(result.membsdata.filter((e) => e.publishStatus===true));
                        setScheduledPostData(result.membsdata.filter((e) => e.publishStatus===false));
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


        return(
            <>

             

                <div className="myproducts-supporter" id="supporter-view">
                    <div className="inside-pannel-dash p-5">
                        <div className="intermost-p-d">
                            <div className="m-p-s-head">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="m-p-s-heading">
                                        <h3>
                                            My Posts
                                        </h3>
                                    </div>
                                    <div className="for-new-pro">
                                        <Link className="newitem-btn" to={`NewPost`} state={{ from: '/Supporter/MyPosts' }}><i class="fa-solid fa-plus"></i> New Post</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="All Posts" {...a11yProps(0)} />
                                        <Tab label="Active" {...a11yProps(1)} />
                                        <Tab label="Scheduled" {...a11yProps(2)} />
                                        <Tab label="History" {...a11yProps(3)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                        {
                                            PostData?.length>0?
                                            <>
                                            <div className="thepost-pre-grid">
                                                {
                                                    PostData?.map((data, i) =>
                                                    <>
                                                        {
                                                            data.publishStatus?
                                                            <>
                                                                <TheCard key={i} data={data} Product={ProductData.filter((e) => e._id===data.Product)[0]}></TheCard>
                                                            </>
                                                            :
                                                            <>
                                                                <TheScheduledCard key={i} data={data} Product={ProductData.filter((e) => e._id===data.Product)[0]}></TheScheduledCard>
                                                            </>
                                                        }
                                                    </>
                                                    )
                                                }
                                            </div>
                                            </>
                                            :null
                                        }
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                        {
                                            ActivePostData?.length>0?
                                            <>
                                                <div className="thepost-pre-grid">
                                                {
                                                    ActivePostData?.map((data, i) =>
                                                    <>
                                                        <TheCard key={i} data={data} Product={ProductData.filter((e) => e._id===data.Product)[0]}></TheCard>
                                                    </>
                                                    )
                                                }
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="t-p-p-p-theno-data p-5 my-5 text-center">
                                                    <h4>No Post <i class="fa-regular fa-folder-open"></i></h4>
                                                </div>
                                            </>
                                        }
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                <div className="thepost-pre-grid">
                                        {
                                            ScheduledPostData?.length>0?
                                            <>
                                                {
                                                    ScheduledPostData?.map((data, i) =>
                                                    <>
                                                        <TheScheduledCard key={i} data={data} Product={ProductData.filter((e) => e._id===data.Product)[0]}></TheScheduledCard>
                                                    </>
                                                    )
                                                }
                                            </>
                                            :null
                                        }
                                    </div>
                                </CustomTabPanel>
                            </div>
                        </div>
                    </div>
                </div>


                <TitleContext.Provider value={{ title, setTitle }}>
                    <Outlet />
                </TitleContext.Provider>

            </>
        )
    }



export default MyPosts;