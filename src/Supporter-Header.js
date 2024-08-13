import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';


var SupporterHeader=()=>
    {
        const navigate = useNavigate();
        const [FSData, setFSData] = useState(false);
        const [ThePostActive, setThePostActive] = useState(false);
        const [PostOptOpen, setPostOptOpen] = useState(false);

        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              }
            }
          }

          $('body').on( "click", function(e) {
            if(PostOptOpen)
            {
                setPostOptOpen(false);
            }
          } );


        $( window ).on( "resize", function(e) {
            if ((document.fullScreenElement && document.fullScreenElement !== null) || 
            (!document.mozFullScreenElement && !document.webkitFullScreenElement)) {
                    if(window.innerHeight === window.screen.height)
                    {
                        setFSData(true);
                    }
                    else if(window.outerHeight > e.target.screen.availHeight && window.innerHeight != window.screen.height)
                    {
                        setFSData(true);
                    }
                    else
                    {
                        setFSData(false);
                    }
            }
          } );



        return(
            <>
    
            <div className="supporter-dash-header">
                <div className="inside-s-d-head">
                    <div className="s-d-head px-4">
                        <div className="internal-flex-s-d-h flex justify-content-between align-items-center">
                            <div className="supporter-v-search">
                                <input type="text" placeholder="Search Bar"/>
                            </div>
                            <div className="right-side-s-h-d">
                                <div className="r-f flex align-items-center">
                                    
                                    {/* <div className="s-d-h-add-post">
                                        <AddBoxOutlinedIcon onClick={(e)=> navigate(`/Supporter/Add-Product`)}></AddBoxOutlinedIcon>
                                    </div> */}
                                    <div className={`s-d-h-add-post ${PostOptOpen} position-relative`}>
                                        <div className='s-d-h-a-p'>
                                            <ControlPointOutlinedIcon onClick={(e)=>{
                                                if(PostOptOpen)
                                                {
                                                    window.setTimeout(function() {
                                                    setPostOptOpen(false);
                                                }, 1);
                                                }
                                                else
                                                {
                                                    window.setTimeout(function() {
                                                        setPostOptOpen(true);
                                                    }, 1);
                                                }
                                            }}></ControlPointOutlinedIcon>
                                        </div>
                                        

                                        <div className={`opts-for-post-or-add ${PostOptOpen}`}>
                                            <div className='inn-o-f-p-o-a'>
                                                <div className='body-o-f-p-o-a'>
                                                    <div className='in-flex justify-content-evenly align-items-center'>
                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/MyPosts/NewPost');}}>
                                                            <span>Post</span>
                                                            <BackupOutlinedIcon></BackupOutlinedIcon>
                                                        </div>
                                                        <div className='the-ops flex justify-content-around align-items-center' onClick={()=>{ navigate('/Supporter/Add-Product');}}>
                                                            <span>Add Item</span>
                                                            <AddToPhotosOutlinedIcon></AddToPhotosOutlinedIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="s-d-h-notifications">
                                        <div className="in-notify active n-m-g">
                                            <i class="fa-regular fa-bell"></i>
                                            <span className="notification-active-">
                                            </span>
                                        </div>
                                    </div>
                                    <div className="s-d-h-setting-g">
                                        <SettingsOutlinedIcon></SettingsOutlinedIcon>
                                        {/* <i class="fa-solid fa-gear"></i> */}
                                    </div>
                                    <div className="s-d-h-full-screen">
                                        {
                                            FSData?
                                            <FullscreenExitOutlinedIcon onClick={()=>toggleFullScreen()}></FullscreenExitOutlinedIcon>
                                            :
                                            <CropFreeOutlinedIcon onClick={()=>toggleFullScreen()}></CropFreeOutlinedIcon>
                                        }
                                        {/* <i class="fa-solid fa-gear"></i> */}
                                    </div>
                                    <div className="my-account-s-h-d-img">
                                        <img src={`/img/tims.png`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            </>
        )
    }
    
    
    export default SupporterHeader;