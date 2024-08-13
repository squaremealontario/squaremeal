import { Link, useLocation } from "react-router-dom";
import $ from 'jquery';
import { useContext, useEffect, useState } from "react";
import PrevLocation from "./Previous-Path";



var SupporterSideBar=()=>
{

    const location = useLocation();
    const [prevLoc, setprevLoc] = useState();
    const {prevPath, setPrevPath} = useContext(PrevLocation);

    var ActiveClass=(e)=>
    {
        $(".inner-s-d-s-opts ul li a").removeClass("active");
        $(e.target).addClass("active");
    }

    var RemoveAllClass=()=>
    {
        $(".inner-s-d-s-opts ul li a").removeClass("active");
    }


    useEffect(()=>
    {
        $(`.inner-s-d-s-opts .upper-sidebtns li a`).removeClass('active');
        $(`.inner-s-d-s-opts .upper-sidebtns li a`).each(function() {
            if (this.href === window.location.href) {
                $(this).addClass('active');
            }
        });
    }, [location])

    useEffect(()=>
    {
        if(prevLoc)
            {
                var a = prevLoc;
                setPrevPath(a);
            }
        setprevLoc(window.location.href);
    }, [location])

    return(
        <>

        <div className="supporter-dash-sidebar">
            <div className="inside-s-d-side py-4 overflow-y-auto">
                <div className="s-d-s-body">
                    <div className="up-head">
                        <div className="logo-heading px-4 pb-2 justify-content-evenly align-items-center">
                            <h2>Square Meal</h2>
                        </div>
                        <div className="s-d-s-opts-body mt-4">
                            <div className="inner-s-d-s-opts flex">
                                <ul className="upper-sidebtns">
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`Supporter/Dashboard`}><i class="fa-solid fa-chart-line"></i> Dashboard</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/`}><i class="fa-solid fa-circle-user"></i> Account</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/`}><i class="fa-solid fa-cash-register"></i> Orders</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`Supporter/Featured-Products`}><i class="fa-solid fa-clipboard-list"></i> Products</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`Supporter/MyPosts`}><i class="fa-solid fa-upload"></i> Posts</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/`}><i class="fa-regular fa-circle-question"></i> Help</Link></li>
                                    <li onClick={(e)=> ActiveClass(e)}><Link to={`/`}><i class="fa-solid fa-gear"></i> Settings</Link></li>
                                </ul>
                                <ul>
                                    <li><Link><i class="fa-solid fa-arrow-right-from-bracket"></i>Log Out</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}


export default SupporterSideBar;