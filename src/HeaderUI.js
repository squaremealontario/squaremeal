import Header from "./Header";
import UIContext from "./MyUICon";
import SupporterHeader from "./Supporter-Header";
const { useContext, useEffect } = require("react")

var HeaderUI =(props)=>
    {

        const {UI_Type} = useContext(UIContext);

        return(
            <>
            {
                UI_Type==="Supporter"?
                <SupporterHeader.MyComp/>:<Header.MyComp/>
            }
            </>
        )
    }

export default HeaderUI;