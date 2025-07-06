import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import IndexUser from './component/user/index.user';
import UserDetail from './component/user/userDetail';
import CreateUser from './component/user/createUser';
import EditUser from './component/user/eidtUser';
import DisCountMangerList from './component/discountManger/discountManger';
import AddDisCountManger from './component/discountManger/creatDisCountManger';
import EditDisCountManger from './component/discountManger/EditDisCountManger';
import DashboardReport from './component/report/DashboardReport';
import CreateCategory from './component/category/createCategory';
import EditCategory from './component/category/eidtCategory';
import AIPage from './component/AI/AI';
const adminPath = '/admin';

function App() {
    return(
        

<Routes>
    <Route path='/' element={<Login />} />
    <Route path='/passwordRecovery' element={<PasswordRecovery />} />

    {/* Admin routes */}
    
    <Route path={`${adminPath}/Dashoard`} element={<DashBorad />} />

    <Route path={`${adminPath}/Product`} element={<Product />} />
    <Route path={`${adminPath}/AddProduct`} element={<AddProduct />} />


    <Route path={`${adminPath}/EditProduct/:id`} element={<EditProduct />} />
    <Route path={`${adminPath}/ProductDetail/:id`} element={<ProductDetail />} />



    <Route path={`${adminPath}/Order`} element={<Order />} />
    <Route path={`${adminPath}/OrderDetail/:id`} element={<OrderDetail />} />


    <Route path={`${adminPath}/Category`} element={<IndexCategory/>}/>
    <Route path={`${adminPath}/CreateCategory`} element={<CreateCategory/>}/>
    <Route path={`${adminPath}/EditCategory/:id_danh_muc`} element={<EditCategory/>}/>

    <Route path={`${adminPath}/AI`} element={<AIPage/>}/>


    
    <Route path={`${adminPath}/IndexUser`} element={<IndexUser/>}/>
    <Route path={`${adminPath}/UserDetail/:id_nguoi_dung`} element={<UserDetail/>}/>
    <Route path={`${adminPath}/CreateUser`} element={<CreateUser/>}/>
    <Route path={`${adminPath}/edit-user/:id_nguoi_dung`} element={<EditUser/>}/>

    

    <Route path={`${adminPath}/Discountmanger`}element={<DisCountMangerList/>}/>
    <Route path={`${adminPath}/AddDisCountManger`} element ={<AddDisCountManger/>}/>
    <Route path={`${adminPath}/EditDisCountManger/:id_giam_gia`} element ={<EditDisCountManger/>}/>

    <Route path={`${adminPath}/DashboardReport`} element={<DashboardReport/>}/>


</Routes>

        
    )
}

export default App;
