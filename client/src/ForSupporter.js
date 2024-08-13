import { useContext, useEffect } from "react";
import UIContext from "./MyUICon";



var ForSupporter=(props)=>
    {

        useEffect(()=>
            {
                sessionStorage.setItem("uitype", "Supporter");
            },[])

        return(
            <props.MyComp/>
        )
    }

export default ForSupporter;