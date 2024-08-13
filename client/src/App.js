import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Site.js';
import './App.css';
import Footer from './Footer.js';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import MyContext from './UserContext.js';
import SupporterSideBar from './Supporter-SideBar.js';
import SupporterHeader from './Supporter-Header.js';
import UIContext from './MyUICon.js';
import HeaderUI from './HeaderUI.js';
import PrevLocation from './Previous-Path.js';
import TitleContext from './Post-Title-Context.jsx';
import CartContext from './Contexts/CartContext.jsx';
import PostContext from './Contexts/PostContext.jsx';
import ProductContext from './Contexts/ProductContext.jsx';

function App() {

  
  const [user, setUser] = useState(null);
  const [prevPath, setPrevPath] = useState(null);
  const [ui, setui] = useState(null);
  const [usertype, setusertype] = useState("guest");
	const cookies = new Cookies();
  const [title, setTitle] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [postData, setPostData] = useState([]);

  
  useEffect(()=>
    {
      if(user)
      {
        if(user.usertype==="Admin")
        {
          setusertype("Admin");
        }
        else if(user.usertype==="Supporter")
        {
          setusertype("Supporter");
        }
        else
        {
          setusertype("Other");
        }
      }
    }, [user])
  
    useEffect(()=>
    {
      // var session = sessionStorage.getItem("userInfo");
      var session = localStorage.getItem("userInfo");
      var uiData = sessionStorage.getItem("uitype");
      if(session!=null)
      {
        setUser(JSON.parse(session));
      }

      if(uiData!=null)
      {
        setui(uiData);
        sessionStorage.removeItem("uitype");
      }
    }, [])
  
  
    useEffect(()=>
    {
        if(cookies.get("usercookie")!=undefined)
        {
          var uid = cookies.get("usercookie");
          userInfo(uid);
        }
    }, [])
  
  
    var userInfo=async(uid)=>
    {
      try
      {
        
          const resp = await fetch(`${process.env.REACT_APP_APIURL}/search-user-by-id/${uid}`)
          if(resp.ok)
          {
              var result = await resp.json();
              if(result.statuscode===0)
              {
              }
              else if(result.statuscode===1)
              {
                setUser(result.membdata);
                sessionStorage.setItem("userInfo", JSON.stringify(result.membdata));
                sessionStorage.setItem("authToken", result.authToken);
              }
          }
          else
          {
  
          }
        }
        catch
        {
  
        }
    }
  

  return (
      <BrowserRouter>
        <MyContext.Provider value={{ user, setUser }}>
          <PrevLocation.Provider value={{ prevPath, setPrevPath }}>
            
          <TitleContext.Provider value={{ title, setTitle }}>
            
              
              <CartContext.Provider value={{ cartData, setCartData }}>

                <PostContext.Provider value={{ postData, setPostData }}>

                  <ProductContext.Provider value={{ productData, setProductData }}>
                    {
                      usertype==="Supporter"?
                      <>
                      {
                        ui==="Supporter"?
                        <SupporterHeader />:<Header CartData={cartData}/>
                      }</>
                      :<Header CartData={cartData}/>
                    }
                    
                      <ToastContainer />
                      <AppRoutes/>
                    {
                      usertype==="Supporter"?
                      <>
                      {
                        ui==="Supporter"?
                        <SupporterSideBar />:<Footer/>
                      }
                      </>:
                      <Footer/>
                    }

                    </ProductContext.Provider>  
                  </PostContext.Provider>
              </CartContext.Provider>
          </TitleContext.Provider>
          </PrevLocation.Provider>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
