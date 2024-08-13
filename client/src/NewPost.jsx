import { Outlet, useLocation, useNavigate } from "react-router-dom";
import $ from 'jquery';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useContext, useEffect, useState } from "react";
import TitleContext from "./Post-Title-Context";


var HeaderNewPost=(prop)=>
    {
        const {title, setTitle }= useContext(TitleContext);


        return(
            <>
                <div className="the-header-n-p-e">
                    <div className="n-p-e-header">
                        <span className="n-p-e-back">
                            <i class="fa-solid fa-arrow-left-long" onClick={prop.BackAction}></i>
                        </span>
                        <span className="n-p-e-title">
                            {title}
                        </span>
                        <span className="n-p-e-close">
                            <i class="fa-solid fa-xmark" onClick={prop.CloseAction}></i>
                        </span>
                    </div>
                </div>            
            </>
        )
    }

var SelectOption=(prop)=>
    {
        const {setTitle} = useContext(TitleContext);
        
        useEffect(()=>
        {
            setTitle("Select One Option");
        }, [])

        var handleFromProduct=()=>
        {
            $('#f-s-p-o').addClass('AfterNextSlide');
            window.setTimeout(function() {
                prop.navigate('Select-Product');
            }, 200);
        }

        return(
            <>
                <div className="for-selecting-post-option" id="f-s-p-o">
                    <div className="f-s-p-o-flex">
                        <div className="f-s-p-o-selectcard">
                            <CollectionsOutlinedIcon></CollectionsOutlinedIcon>
                            <button className="s-f-p-btn" onClick={handleFromProduct}>Select From Products</button>
                        </div>
                        <div className="n-p-e-vline">
                            <div className="the-vertical-line"></div>
                        </div>
                        <div className="f-s-p-o-selectcard">
                            <AddPhotoAlternateOutlinedIcon></AddPhotoAlternateOutlinedIcon>
                            <button className="s-f-p-new-btn" onClick={() => prop.navigate('/Supporter/Add-Product')}>Create New Product</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }



var NewPost=()=>
    {

        const [widthCSS, setWidthCSS] = useState();
        const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from || '/';
        const {title, setTitle }= useContext(TitleContext);
        const CloseThePanel = (event) => {
            if (event.target === event.currentTarget) {
                $('#newPostEnv .n-p-e-body .n-p-e-mainbody').addClass('PostPopupClose');
                window.setTimeout(function() {
                    navigate(`${extractBaseUrl(window.location.href)}`);
                }, 400);
            }
        };

        function extractBaseUrl(fullUrl) {
            try {
              const url = new URL(fullUrl);
              const pathSegments = url.pathname.split('/').filter(segment => segment); // Split and filter out empty segments
              const baseUrl = `/${pathSegments[0]}/${pathSegments[1]}`;
              return baseUrl;
            } catch (error) {
              return null;
            }
          }

        const BackPanel = (event) => {
            if (event.target === event.currentTarget) {
                if(window.location.href === `${process.env.REACT_APP_SITE_URL}/Supporter/MyPosts/NewPost`)
                {
                    $('#newPostEnv .n-p-e-body .n-p-e-mainbody').addClass('PostPopupClose');
                    window.setTimeout(function() {
                    navigate(from);
                    }, 400);
                }
                else
                {
                    navigate(-1);
                }
            }
        };

        const ClosePanel = (event) => {
            if (event.target === event.currentTarget) {
                navigate(`/${window.location.href}`);
            }
        };


        const GoToSelectPanel = (event) => {
            $('.for-selecting-post-option').addClass('Slide-The-Panel');
            window.setTimeout(function() {
            navigate(`Select-Product`);
            }, 400);
        };

        return(
            <>
            
                <div className="new-post-env" id="newPostEnv" onClick={CloseThePanel}>
                    <div className="n-p-e-body" onClick={CloseThePanel}>
                        <div className={`n-p-e-mainbody ${widthCSS}`}>
                            <div className="the-main-body-outer-n-p-e">
                                <HeaderNewPost CloseAction={CloseThePanel} BackAction={BackPanel}></HeaderNewPost>
                                {
                                    window.location.href === `${process.env.REACT_APP_SITE_URL}/Supporter/MyPosts/NewPost` ?
                                        <>
                                            <SelectOption navigate={navigate} Title={title}></SelectOption>
                                        </>
                                        :
                                        <Outlet />
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }


export default NewPost;