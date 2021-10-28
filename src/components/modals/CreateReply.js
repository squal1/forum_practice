import React , {useState, useEffect} from 'react'
import ReactDOM from "react-dom"
import db from '../../firebase';
import {useHistory} from "react-router-dom"
import { useStateValue } from '../../StateProvider';

const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#c5c5c5",
    padding: "50px",
    zIndex:1000,
    width: "65%",
    height:"90%"
    
}

const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex:1000
}

function CreateReply( {id, open, onClose}) {
    const [{ user }] = useStateValue();

    const history = useHistory();
    const [newReply, setNewReply] = useState("");
    const time = Date.now();
    const timestamp = new Date(time);

    const [ userName, setUserName] = useState(null);

    useEffect(() => {
        db.collection("users").doc(user.displayName).onSnapshot(snapshot => 
            setUserName(snapshot.data()))
    }, [])

    const createNewReply = () => {
        if (newReply) {
            db.collection("topics").doc(id).collection("replies").add({
                time:timestamp,
                content:newReply,
                author:userName.userName,
            })
            setNewReply("")
            document.getElementById('cancel').click()
            // Direct page to newly added topic
            history.push(`/post/${id}`)
        }
    }


    if (!open) return null
    return  ReactDOM.createPortal(
        <>
        <div style = {OVERLAY_STYLES} onClick = {onClose}/>
        <div style = {MODAL_STYLES}>
            <h2>Creating reply</h2>
            <p>Content</p>
            <textarea type = "text" id="contentInput" placeholder = "Content of youe reply" value={newReply} onChange={(e) => setNewReply(e.target.value) }></textarea>
            <button onClick = {createNewReply}>Submit</button>
            <button id = "cancel" onClick = {onClose}>Cancel</button>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default CreateReply
