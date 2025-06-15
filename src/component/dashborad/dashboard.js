import '../../css/main.css'
import '../../css/util.css'
import '../../css/style.css'
import AppHeader from '../utils/header/header'
import Sidebar from '../utils/sidebar/sidebar'
import IndexDashBoard from '.'

function DashBorad()
{
    return (
    
       
            <>
            <AppHeader/>
            <IndexDashBoard/>
            <Sidebar/>
            </>
     
        
    )
}
export default DashBorad