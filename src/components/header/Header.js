import React, {useState, useEffect} from 'react';
import "../../styles/Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useStateValue } from '../../StateProvider';
import db from '../../firebase';
import Exp from './exp';
import SideMenu from './SideMenu';
import Sidebar from "react-sidebar";

function Header() {
    const [{ user }] = useStateValue();
    const [ userName, setUserName] = useState(null);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const onSetSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    }


    useEffect(() => {
        //Run this code once when the header component laods - get username
        db.collection("users").doc(user.displayName).onSnapshot(snapshot => 
            setUserName(snapshot.data()))
    }, [])


    return (
        <div className = "header" >
            <div className = "header_menu">
            <MenuIcon className = "menu_icon" onClick={() => { setIsMenuOpen(true) }} />
            <SideMenu userinfo = {user} username = {userName} open = {isMenuOpen} onClose = {() => setIsMenuOpen(false)}/>
                
            </div>
            <div className = "header_searchBar">
                <SearchIcon/>
                <input type= "text" placeholder="Search..."/>
            </div>
            <div className = "header_refresh">
                <RefreshIcon/>
            </div>
            <div className = "header_help">
                <HelpOutlineIcon/>
            </div>
        </div>
    )
}

export default Header
