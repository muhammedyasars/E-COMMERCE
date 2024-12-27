import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegistrationForm from './Component/RegistrationForm'
import Loginpage from './Component/Loginpage'
import Navbar from './Component/Layout/Navbar'
import Footer from './Component/Layout/Footer'
import Layout from './Component/Layout/Layout'
import Products from './Component/ProductCard/Products'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './Component/ProductCard/ProductDetails'
import Cart from './Component/Product Cart/Cart'
import Address from './Component/Address/Address'
import PaymentPage from './Component/Order/PaymentPage'
import Orderpage from './Component/Order/Orederpage'
import AdminPage from './Component/Admin/AdminPage'
import Dashboard from './Component/Admin/Dashboard/Dashboard'
import ProductsDetails from './Component/Admin/Products/ProductsDetails'
import UserDetails from './Component/Admin/Users/UserDetails'
import BlockList from './Component/Admin/Orders/BlockList'




const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Products />} />
          <Route path='/Navbar:category' element={<Navbar />} />
          <Route path='/Footer' element={<Footer />} />
          <Route path='/Product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/Register' element={<RegistrationForm />} />
        <Route path='/Loginpage' element={<Loginpage />} />
        <Route path='/address' element={<Address />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/orderpage' element={<Orderpage />} />
        
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />
          <Route path="Blocklist" element={<BlockList />} />
          <Route path="Products" element={<ProductsDetails />} />
          <Route path="Users" element={<UserDetails />} />
        </Route>


      </Routes>
    </Router>

  )
}

export default App