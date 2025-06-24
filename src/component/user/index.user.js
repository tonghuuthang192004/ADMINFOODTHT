import AppHeader from "../utils/header/header"
import Sidebar from "../utils/sidebar/sidebar"
import HomeUser from "./home.user"
function IndexUser()
{
    return (
        <>
        <AppHeader/>
        <Sidebar/>
        <HomeUser/>
        </>
    )
}
export default IndexUser