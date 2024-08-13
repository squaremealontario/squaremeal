import { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import $ from 'jquery';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "./UserContext";
import Cookies from "universal-cookie";




var Login =()=>
    {

        const [Email,setEmail] = useState("");
        const [Pass,setPass] = useState("");
        const {setUser} = useContext(MyContext);
        const [Error,setError] = useState();
        const [ErrorDetail,setErrorDetail] = useState();
        const [orderForError,setOrderForError] = useState("display-none");
        const [fadeLoad,setFadeLoad] = useState("display-none");
        const [loadingRage,setloadingRage] = useState("display-none");
        const [PassCan,setPassCan] = useState("display-none");
        const [PassCant,setPassCant] = useState("display-block");
        const [Captcha,setCaptcha] = useState(false);
        const [rem,setRem] = useState(false);
        const cookies = new Cookies();
        const navigate = useNavigate();
        
    var validations =()=>
        {
            if(Email.length<1)
                {
                    setError("Email Required");
                    setErrorDetail("Please Enter your Email");
                    setOrderForError('display-fixed');
                }
            else if(Pass.length<1)
                {
                    setError("Password Format");
                    setErrorDetail("Password must have at least 8 characters including at least one number");
                    setOrderForError('display-fixed');
                }
            // else if(!Captcha)
            //     {
            //         setError("Robot Verification Failed");
            //         setErrorDetail("Please check the reCAPTCHA I'm not a robot and then try again");
            //         setOrderForError('display-fixed');
            //     }
                else
                {
                    if(Email.match(/^n01\d{6}@humber\.ca$/))
                    {
                        onLogin("Student");
                    }
                    else
                    {
                        onLogin("Other");
                    }
                }
        }

           
	var onLogin = async(LoginAPI)=>
        {
            var user;
            var a = setloadingRage("display-block");
            var b = setFadeLoad("display-block");
            var registerData = {Email,Pass,Usertype:user,LoginAPI}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/login`,
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
                        toast.success(`Your are now logged in`, {
                        position: "top-center"
                        });
                        setUser(result.membdata);
                        // sessionStorage.setItem("userInfo", JSON.stringify(result.membdata));
                        // sessionStorage.setItem("authToken", result.authToken);
                        localStorage.setItem("userInfo", JSON.stringify(result.membdata));
                        localStorage.setItem("authToken", result.authToken);
                        if(rem===true)
                        {
                            cookies.set("usercookie", result.membdata._id, {maxAge: 60*60*24*7});
                        }
                        navigate("/")
                    },300);
                }
                else if(result.statuscode===0)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Wrong Username or Password`, {
                            position: "top-center"
                        });
                    },300);
                }
            }
            else
            {
                setloadingRage("load-complete");
                var ce = setTimeout(function() {
                    var d = setloadingRage("display-none");
                    var e = setFadeLoad("display-none");
                    toast.error(`Error! Please check the information again`, {
                        position: "top-center"
                    });
                },300);
            }
        }

    useEffect(()=>
        {
            window.scrollTo({top: 0, behavior: 'instant'});
        }, [])

    var closeEnv =()=>
        {
            setOrderForError("display-none");
        }

    function onChange(value) {
        if(value)
        {
            setCaptcha(true)
        }
        else
        {
            setCaptcha(false);
        }
        }

        var nextLine=(e)=>
            {
                if(e.key==="Enter")
                {
                    if(!Pass)
                        {
                            $("#floatingPassword").focus();
                        }
                    else
                    {
                        validations();
                    }
                }
            }
    

        return(
            <>
            <div className="-b-banner- py-5">
                <div className="inside-b-banner text-center py-4">
                    <h4>Login</h4>
                    <div className="breadcrums mt-3">
                        <h6><i class="fa-solid fa-house"></i>&nbsp; Home / <span>Login</span></h6>
                    </div>
                </div>
            </div>
            
                <div className="create-acount py-5">
                    <div className="container py-3">
                        <div className="header-4-create-ac text-center mb-5">
                            <h3>
                                Login
                            </h3>
                        </div>
                        <div className="student-form mb-5">
                            
                            <div class="form-floating mb-4">
                                <input type="email" onChange={(e) => setEmail(e.target.value)} onKeyDown={(e)=>nextLine(e)} min={5} class="form-control" id="floatingEmail" placeholder="Email" />
                                <label htmlFor="floatingEmail">Email</label>
                            </div>
                            <div class="form-floating mb-5">
                                <input type="password" onChange={(e) => setPass(e.target.value)}onKeyDown={(e)=>{
                                    if(e.key==="Enter")
                                        {
                                            validations();
                                        }
                                }} min={8} class="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                                <i class={`fa-solid fa-eye ${PassCant}`} onClick={()=> {setPassCan("display-block"); setPassCant("display-none"); $("#floatingPassword").attr('type', 'text')}}></i>
                                <i class={`fa-solid fa-eye-slash ${PassCan}`} onClick={()=> {setPassCant("display-block"); setPassCan("display-none"); $("#floatingPassword").attr('type', 'password')}}></i>
                            </div>
                            <ReCAPTCHA
                                sitekey="6LdRvYgpAAAAABPBp1jBzCF6eChnojsRj9yQHu6K"
                                onChange={onChange}
                            />
                            <button className="signup-btn-2 mt-5 mb-4" onClick={()=>validations()}>
                                Log In
                            </button>
                            <div className="already-ac text-center">
                            Don't have an account? <Link to={"/Create-Account"}>Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>

                
        <div className={`error-env ${orderForError}`} id="error-env">
            <div className="error-card-outside">
                <div className="error-card">
                    <div className="error-body-up">
                        <i class="fa-solid fa-x" onClick={()=> closeEnv()}></i>
                    </div>
                    <div className="error-detail text-center p-5">
                        <div className="error-icon">
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <h3 className="mt-3 mb-2">
                            {Error}
                        </h3>
                        <p>
                            {ErrorDetail}
                        </p>
                    </div>
                </div>
            </div>
           
        </div>

        <div className="loading-line">
            <div className={`loading-range ${loadingRage}`}>

            </div>
        </div>

        <div className={`fade-screen ${fadeLoad}`}>

        </div>


            </>
        )
    }


export default Login;