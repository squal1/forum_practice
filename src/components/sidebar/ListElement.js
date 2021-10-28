import React from 'react'
import {useHistory} from "react-router-dom"

function ListElement( {author, title , id}) {
    
    const history = useHistory();
    // When a topic is clicked, useHistory can push the url into
    // the history to force the website to redirect
    const selectTopic = () => {
        history.push(`/post/${id}`);
    }

    return (
        <div className= "list_element">
            <a class="list-group-item list-group-item-action" onClick={selectTopic}>
                <div className = "author" >
                    {author}
                </div>
                <div className = "title" >
                    {title}
                </div>
            </a>
        </div>
    )
}

export default ListElement
