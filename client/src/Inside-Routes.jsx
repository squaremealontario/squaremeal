import { Route, Routes } from "react-router-dom";
import ForSupporter from "./ForSupporter";
import NewPost from "./NewPost";




var InsideRoutes=()=>
    {
        return(
            <Routes>
                <Route path="/Supporter/NewPost" element={<ForSupporter MyComp={NewPost} />} />
            </Routes>
        )
    }


export default InsideRoutes;