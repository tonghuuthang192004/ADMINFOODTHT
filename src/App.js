import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordRecovery from './component/forgot/forgot';
import DashBorad from './component/dashborad/dashboard';
import  Product from './component/product/Product.index'
import AddProduct from './component/product/CreateProduct';
import Login from './component/Login/Login';
import EditProduct from './component/product/EditProduct';
function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/passwordRecovery' element={<PasswordRecovery/>}/>
                <Route path='/DashBorad' element={<DashBorad/>}/>
                <Route path='/Product' element={<Product/>} />
                 <Route path='/AddProduct' element={<AddProduct/>} />
                 <Route path='/EditProduct' element={<EditProduct/>}/>

            </Routes>
        </Router>
    )
}

export default App;
