import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordRecovery from './component/forgot/forgot';
import DashBorad from './component/dashborad/dashboard';
import  Product from './component/product/Product.index'
import AddProduct from './component/product/CreateProduct';
import Login from './component/Login/Login';
import EditProduct from './component/product/EditProduct';
import ProductDetail from './component/product/detailProduct';
import Order from './component/order/index.order';
import OrderDetail from './component/order/detail.order';
import { elements } from 'chart.js';
import IndexCategory from './component/category/catrgory.index';
const adminPath = '/admin';

function App() {
    return(
        <Router>

<Routes>
    <Route path='/' element={<Login />} />
    <Route path='/passwordRecovery' element={<PasswordRecovery />} />

    {/* Admin routes */}
    <Route path={`${adminPath}/DashBorad`} element={<DashBorad />} />
    <Route path={`${adminPath}/Product`} element={<Product />} />
    <Route path={`${adminPath}/AddProduct`} element={<AddProduct />} />
    <Route path={`${adminPath}/EditProduct/:id`} element={<EditProduct />} />
    <Route path={`${adminPath}/ProductDetail/:id`} element={<ProductDetail />} />
    <Route path={`${adminPath}/Order`} element={<Order />} />
    <Route path={`${adminPath}/OrderDetail/:id`} element={<OrderDetail />} />
    <Route path={`${adminPath}/Category`} element={<IndexCategory/>}/>
</Routes>

        </Router>
    )
}

export default App;
