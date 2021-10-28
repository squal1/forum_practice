import React, {useState} from 'react'
import ReactDOM from "react-dom"
import db from '../../firebase';
import "../../styles/SideMenu.css";


const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex:1000
}


function SideMenu({userinfo, username, open, onClose}) {
    const [ newUserName, setNewUserName] = useState(null);
    console.log(userinfo.displayName)

    const changeUserName = () => {
        db.collection("users").doc(userinfo.displayName).set({
            userName:newUserName,
        })
        setNewUserName("")
    }

    if (!open) return null
    return  ReactDOM.createPortal(
        <>
        <div id = "Menu_Overlay" style = {OVERLAY_STYLES} onClick = {onClose}/>
        <div className = "Menu" id = 'Menu' >
            <div className = "userName">
            UserName:   {username?.userName}
            </div>
            <div className = "changeUserName">
            <br/>
            Change your username here
            <input type="text" id="titleInput" placeholder = "New UserName" value={newUserName} onChange={(e) => setNewUserName(e.target.value) } ></input>
            <button onClick = {changeUserName}>Change username</button>
            </div>
            

        </div>
        </>,
        document.getElementById('portal')
    )
}


export default SideMenu
