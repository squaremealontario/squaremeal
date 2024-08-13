import { useContext, useEffect } from "react";
import CartContext from "../Contexts/CartContext";


var FetchCart=(Post,User)=>
{
    const {cartData, setCartData} = useContext(CartContext);

    useEffect(()=>
    {
        fetchCart();
    },[])

    var fetchCart=async()=>
    {
        var registerData = {Post,User}
            var resp = await fetch(`${process.env.REACT_APP_APIURL}/cart-data`,
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
                    setCartData(result.membsdata);
                }
            }
            else
            {
                
            }
    }

    
}

export default FetchCart;