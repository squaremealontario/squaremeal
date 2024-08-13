import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./Home";
import React from 'react';
import CreateAccount from "./Create-Account";
import SignupStudent from "./Signup-Student";
import SignupSupporter from "./Signup-Supporter";
import Login from "./Login";
import SupporterDashboard from "./Supporter-Dashboard";
import ForSupporter from "./ForSupporter";
import MyProducts from "./MyProducts";
import AddProduct from "./Add-Product";
import MyPosts from "./MyPosts";
import NewPost from "./NewPost";
import SelectPostOption from "./SelectPostOption";
import Cart from "./Cart/Cart";


var AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Navigate to="/" />} />
            <Route path="/Create-Account" element={<CreateAccount />} />
            <Route path="/Create-Account/Student" element={<SignupStudent />} />
            <Route path="/Create-Account/Supporter" element={<SignupSupporter />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Supporter/Dashboard" element={<ForSupporter MyComp={SupporterDashboard} />} />
            <Route path="/Supporter/Featured-Products" element={<ForSupporter MyComp={MyProducts} />} />
            <Route path="/Supporter/Add-Product" element={<ForSupporter MyComp={AddProduct} />} />
            <Route path="/Supporter/MyPosts/*" element={<ForSupporter MyComp={MyPosts} />}>
                <Route path="NewPost/*" element={<ForSupporter MyComp={NewPost} />}>
                    <Route path="Select-Product" element={<ForSupporter MyComp={SelectPostOption} />} />
                </Route>
            </Route>
            <Route path="/Cart" element={<Cart />} />
        </Routes>
    )
}
export default AppRoutes;