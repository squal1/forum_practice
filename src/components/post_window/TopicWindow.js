import React , {useEffect, useState }from 'react'
import "../../styles/TopicWindow.css"
import {useParams} from "react-router-dom"
import TopicContent from "./TopicContent.js"
import db from "../../firebase"
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CreateReply from '../modals/CreateReply.js';

function TopicWindow() {
    const {postId} = useParams();
    const [postTitle, setPostTitle] = useState(null)
    const [postReplies, setPostReplies] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    //run this code everytime the postId updated
    useEffect( () => {
        //get the topic title
        if (postId) {
            db.collection("topics").doc(postId).onSnapshot( (snapshot) => (
                setPostTitle(snapshot.data())
            ))
        }

        //get the replies of the topic and order it by time
        db.collection("topics").doc(postId).collection("replies").orderBy("time", "asc")
        .onSnapshot((snapshot) => setPostReplies(snapshot.docs.map((doc) => doc.data())))
        
    }, [postId]);

    return (
        <div className = "topic_window">
         <div className = "topic_header">
            <h2>{postTitle?.title}</h2>
            <div className = "add_reply">
                <AddRoundedIcon className = "addRoundedIcon" onClick={() => setIsModalOpen(true)}/>
                <CreateReply id = {postId} open = {isModalOpen} onClose = {() => setIsModalOpen(false)} />
            </div>
         </div>
         <div className = "topic_content">
            {postReplies.map(reply => (
                <TopicContent
                author = {reply.author}
                content = {reply.content}
                time = {new Date(reply.time.seconds * 1000).toLocaleString()}
                />
            ))}
         </div>
        </div>
    )
}

export default TopicWindow
