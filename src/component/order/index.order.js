import AppHeader from "../utils/header/header"
import Sidebar from "../utils/sidebar/sidebar"
import OrderList from "./order"
function Order(){
    return(
        <>
        <AppHeader/>
        <Sidebar/>
        <OrderList/>

        </>
    )
}
export default Order