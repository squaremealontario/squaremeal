import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import $ from 'jquery';
import { toast } from "react-toastify";



var SignupStudent = () =>
{
    const [FName,setFName] = useState("");
    const [Email,setEmail] = useState("");
    const [LName,setLName] = useState("");
    const [Pass,setPass] = useState("");
    const [CPass,setCPass] = useState("");
    const [Error,setError] = useState();
    const [ErrorDetail,setErrorDetail] = useState();
    const [orderForError,setOrderForError] = useState("display-none");
    const [fadeLoad,setFadeLoad] = useState("display-none");
    const [loadingRage,setloadingRage] = useState("display-none");
    const [PassCan,setPassCan] = useState("display-none");
    const [PassCant,setPassCant] = useState("display-block");
    const [CPassCan,setCPassCan] = useState("display-none");
    const [CPassCant,setCPassCant] = useState("display-block");
    const [Captcha,setCaptcha] = useState(false);
    const [TNC,setTNC] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>
        {
            window.scrollTo({top: 0, behavior: 'instant'});
        }, [])

        var closeEnv =()=>
            {
                setOrderForError("display-none");
            }
    
        function onChange(value)
        {
            if(value)
            {
                setCaptcha(true)
            }
            else
            {
                setCaptcha(false);
            }
        }
        
    var validations =()=>
        {
            if(FName.length<2)
                {
                    setError("Invalid First Name");
                    setErrorDetail("Please Enter valid First Name");
                    setOrderForError('display-fixed');
                }
            else if(LName.length<2)
                {
                    setError("Invalid Last Name");
                    setErrorDetail("Please Enter valid Last Name");
                    setOrderForError('display-fixed');
                }
            else if(Email.length<1)
                {
                    setError("Email Required");
                    setErrorDetail("Please Enter your Email");
                    setOrderForError('display-fixed');
                }
            else if(!Email.match(/^n01\d{6}@humber\.ca$/))
                {
                    setError("Invalid Humber Email");
                    setErrorDetail("This is not valid Humber Email Id. Please enter valid Humber Email");
                    setOrderForError('display-fixed');
                }
            else if(!Pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/))
                {
                    setError("Password Format");
                    setErrorDetail("Password must have at least 8 characters including at least one number");
                    setOrderForError('display-fixed');
                }
            else if(CPass!=Pass)
                {
                    setError("Passwords Not Matching");
                    setErrorDetail("Password and Confirm Password Are Not Same");
                    setOrderForError('display-fixed');
                }
            else if(!TNC)
                {
                    setError("Unchecked Term & Conditions");
                    setErrorDetail("Please agree the Terms & Conditions & Privacy Policy");
                    setOrderForError('display-fixed');
                }
            else if(!Captcha)
                {
                    setError("Robot Verification Failed");
                    setErrorDetail("Please check the reCAPTCHA I'm not a robot and then try again");
                    setOrderForError('display-fixed');
                }
                else
                {
                    onregister();
                }
        }


             
	var onregister = async()=>
        {
            var a = setloadingRage("display-block");
            var b = setFadeLoad("display-block");
            var registerData = {FName,LName,Email,Pass,Usertype:"Student"}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/register-student`,
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
                        toast.success(`Account Created Successfully`, {
                        position: "top-center"
                        });
                        toast.success(`Verification mail is sent to your email. Please verify your Email`, {
                            position: "top-center"
                            });
                        navigate("/")
                    },300);
                }
                else if(result.statuscode===0)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.error(`Error! Please check your details again`, {
                            position: "top-center"
                        });
                    },300);
                }
                else if(result.statuscode===3)
                {
                    setloadingRage("load-complete");
                    var ce = setTimeout(function() {
                        var d = setloadingRage("display-none");
                        var e = setFadeLoad("display-none");
                        toast.success(`Account Created Successfully`, {
                            position: "top-center"
                        });
                        toast.error(`Faced problem to send verification mail. Please it again and update`, {
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


    return(

        <>
        
        {/* <div className="banner">
            <div className="inner-banner">
                <img src="/img/banner.png" alt=""/>
                <div className="overflow-black">

                </div>
                <h4 className="create-ac">
                    Create your account
                </h4>
            </div>
        </div> */}

        <div className="create-account py-5">
            <div className="container pt-3">
                <div className="header-4-create-ac text-center mb-5">
                    <h3>
                        Create your account
                    </h3>
                </div>
                <div className="student-form text-center mb-5">
                    <div className="grid">
                        <div class="form-floating mb-4">
                            <input type="text" onChange={(e) => setFName(e.target.value)} class="form-control" id="floatingFirstName" placeholder="First Name" />
                            <label htmlFor="floatingFirstName">First Name</label>
                        </div>
                        <div class="form-floating mb-4">
                            <input type="text" onChange={(e) => setLName(e.target.value)} class="form-control" id="floatingLastName" placeholder="Last Name" />
                            <label htmlFor="floatingLastName">Last Name</label>
                        </div>
                    </div>
                    
                    <div class="form-floating mb-4">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" id="floatingEmail" placeholder="Humber Email" />
                        <label htmlFor="floatingEmail">Humber Email</label>
                    </div>
                    <div class="form-floating mb-4">
                        <input type="password" onChange={(e) => setPass(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                        <i class={`fa-solid fa-eye ${PassCant}`} onClick={()=> {setPassCan("display-block"); setPassCant("display-none"); $("#floatingPassword").attr('type', 'text')}}></i>
                        <i class={`fa-solid fa-eye-slash ${PassCan}`} onClick={()=> {setPassCant("display-block"); setPassCan("display-none"); $("#floatingPassword").attr('type', 'password')}}></i>
                    </div>
                    <div class="form-floating mb-4">
                        <input type="password" onChange={(e) => setCPass(e.target.value)} class="form-control" id="floatingCPassword" placeholder="Confirm Password" />
                        <label htmlFor="floatingCPassword">Confirm Password</label>
                        <i class={`fa-solid fa-eye ${CPassCant}`} onClick={()=> {setCPassCan("display-block"); setCPassCant("display-none"); $("#floatingCPassword").attr('type', 'text')}}></i>
                        <i class={`fa-solid fa-eye-slash ${CPassCan}`} onClick={()=> {setCPassCant("display-block"); setCPassCan("display-none"); $("#floatingCPassword").attr('type', 'password')}}></i>
                    </div>
                    <div className="tnc-apply text-start pt-2 mb-4 flex align-items-center" >
                        <span className="tick-check me-2 flex align-items-center">
                            {
                                TNC?
                                <>
                                <i class="fa-solid fa-square-check" onClick={()=> setTNC(false)}></i>
                                </>
                                :<i class="fa-regular fa-square" onClick={()=> setTNC(true)}></i>
                                
                            }
                        </span>
                        <div><span onClick={()=> {
                        if(TNC)
                        {
                            setTNC(false);
                        }
                        else
                        {
                            setTNC(true);
                        }}}>By creating an account, I accept the </span><span className="TNCNPP">Terms & Conditions & Privacy Policy</span></div>
                        
                    </div>
                    <ReCAPTCHA
                        sitekey="6LdRvYgpAAAAABPBp1jBzCF6eChnojsRj9yQHu6K"
                    />

                    <button className="signup-btn-2 my-4" onClick={()=>validations()}>
                        Sign Up
                    </button>
                    <div className="already-ac">
                        Already have an account? <Link to={"/Login"}>Login</Link>
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

export default SignupStudent;