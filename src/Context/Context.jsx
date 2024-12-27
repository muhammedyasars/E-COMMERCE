
import axios from 'axios'
import React ,{ useEffect, useState } from 'react'
import { createContext } from 'react'
 
 export const newcontext=createContext()
function Context({children}) {
const [name,setname]=useState('')
    
  const id =localStorage.getItem("id")
    
    const[cart,setCart]=useState([])
    const [isLogged,setislogged]=useState(false)
    const [products, setProducts] = useState([]);
    const[orders,setOrders]=useState([])
  
   
    

useEffect(()=>{

if(id){
  setislogged(true)
}
},[])

  useEffect(() => { 
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data)
       
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);




  useEffect(()=>{                                        

    axios.get(`http://localhost:3000/users/${id}`)
    
    .then((res=>{
        setCart(res.data.cart)
    }))
    .catch((error)=>{
        console.log(error)
    })

  },[])
  useEffect(()=>{
    axios.get(`http://localhost:3000/users/${id}`)
    .then((res=>{
        setOrders(res.data.order)
    }))
    .catch((error)=>{
        console.log(error)
    })
  },[])


  
  const AddtoCart=async(product)=>{
    const existcart=cart.find(item=>item.id===product.id)
    if(existcart) 
        return
    try {
      product.quantity=1
      await axios.patch(`http://localhost:3000/users/${id}`,{cart:[...cart,product]})
      setCart((prev)=>[...prev,product])
      
    } catch (error) {
      console.log(error)
      
    }

  }
  const RemoveCart=async(cartid)=>{
try {
  const remove=cart.filter((item)=>item.id!==cartid)
     await axios.patch(`http://localhost:3000/users/${id}`,{cart:[...remove]})
     setCart(remove)
} catch (error) {
  console.log(error)
}     

  }
 const updatequantity=async(cartProduct,num)=>{
    if(num===-1&&cartProduct.quantity===1)
    return
    const newcart=cart.map((item)=>item.id===cartProduct.id?{...item,quantity:item.quantity+num}:item)
    await axios.patch(`http://localhost:3000/users/${id}`,{cart:[...newcart]})
     setCart(newcart)

 }
 const totalAmount = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div>
        <newcontext.Provider value={{name,products,setname,cart,setCart,AddtoCart,RemoveCart,updatequantity,orders,totalAmount,isLogged,setislogged,setOrders}}>
            {children}
        </newcontext.Provider>
      
    </div>
  )
}

export default Context