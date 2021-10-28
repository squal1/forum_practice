import React from 'react'
import "../../styles/TopicContent.css"

function TopicContent({author, content, time}) {

    return (
        <div className = "reply">
            <h5>{author}</h5>
            <h3>{content}</h3>
            <h7>{time}</h7>
        </div>

    )
}
export default TopicContent
