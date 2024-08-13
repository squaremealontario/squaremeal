import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



var CreateAccount = () =>
{

    const navigate = useNavigate();

    useEffect(()=>
    {
        window.scrollTo({top: 0, behavior: 'instant'});
    }, [])

    return(

        <>
        
        <div className="-b-banner- py-5">
                <div className="inside-b-banner text-center py-4">
                    <h4>Create Account</h4>
                    <div className="breadcrums mt-3">
                        <h6><i class="fa-solid fa-house"></i>&nbsp; Home / <span>Signup</span></h6>
                    </div>
                </div>
            </div>

        <div className="create-account py-5">
            <div className="container py-3">
                <div className="header-4-create-ac text-center mb-5">
                    <h3>
                        Create An Account
                    </h3>
                </div>
                <div className="choose-account text-center mb-5">
                    <div className="account-block">
                        <button onClick={()=>navigate("/Create-account/Student")}>I am a Humber College Student</button>
                    </div>
                    <div className="account-block">
                        <button onClick={()=>navigate("/Create-account/Supporter")}>I want to support students</button>
                    </div>
                </div>
            </div>
        </div>

        </>

    )
}

export default CreateAccount;