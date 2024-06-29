import '/Users/manikmittal/Documents/print-mart/client/src/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './Authorisation/Register';
import Login from './Authorisation/Login';
import Pagenf from './pages/Pagenf';
import RegisterAdmin from './Authorisation/RegisterAdmin';
import Admindetails from './Authorisation/Admindetails';
import Aboutseller from './Authorisation/Aboutseller';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy.js';
import Productdetails from './pages/Productdetails';
import slugify from 'slugify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Createorder from './pages/Createorder';
import Userdash from './user/Userdash';
import { BsPersonFillCheck } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Profile from './user/Profile';
import Order from './user/Order';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Layout from './Layout/Layout';
import UpdateProduct from './pages/Admin/UpdateProduct';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Products from './pages/Admin/Products';
import Queries from './pages/Admin/Queries';
function App() {
  return (
    <>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/radmin' element={<RegisterAdmin />} />
        <Route path='/admindetails' element={<Admindetails />} />
        <Route path='/aboutseller/:vendorName' element={<Aboutseller />} />
        <Route path='/*contact' element={<Contact />} />
        <Route path='/*privacy' element={<Privacy />} />
        <Route path='/productdetails/:slug' element={<Productdetails />} />
        <Route path='/createorder' element={<Createorder />} />
        <Route path='/userdash' element={<Userdash />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Order />} />


        <Route path='*' element={<Pagenf />} />

        <Route path="admin/:email" element={<AdminDashboard />} />
        <Route path="dashboard/admin/create-category" element={<CreateCategory />} />
        <Route path="dashboard/admin/create-product" element={<CreateProduct />} />
        <Route path="dashboard/admin/product/:slug" element={<UpdateProduct />} />
        <Route path="dashboard/admin/products/:name" element={<Products />} />
        <Route path="dashboard/admin/queries" element={<Queries />} />

      </Routes>
    </>
  );
}

export default App;
