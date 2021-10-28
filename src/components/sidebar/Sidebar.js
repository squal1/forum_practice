import React, { useState, useEffect } from 'react';
import "../../styles/Sidebar.css";
import CreateIcon from '@material-ui/icons/Create';
import "bootstrap/dist/css/bootstrap.min.css"
import db from '../../firebase';
import Topics from './Topics.js';
import CreateTopic from '../modals/CreateTopic.js';

function Sidebar() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        //Run this code once when the sidebar component laods
        db.collection("topics").orderBy("time","desc").onSnapshot(snapshot => (
            setTopics(
                snapshot.docs.map(doc=>({
                    id: doc.id,
                    author: doc.data().author,
                    title: doc.data().title,
                    time: doc.data().time,
                }))
            )
        ))
    }, [])
    
    return (
        <div className = "sidebar">
            <div className = "sidebar_header">
                <h2>This is sidebar header</h2>
                <CreateIcon className = "create_icon" onClick={() => setIsModalOpen(true)}/>
                <CreateTopic open = {isModalOpen} onClose = {() => setIsModalOpen(false)} />
            </div>
            <div className = "side_bar_body">
                <Topics topics = {topics}/>
            </div>
        </div>
    )
}

export default Sidebar
