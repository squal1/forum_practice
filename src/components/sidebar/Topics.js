import React from 'react'
import ListElement from "./ListElement.js"

function Topics({topics}) {

    return (
    topics.map ((topic) => {
        return (
            <ListElement author={topic.author} title={topic.title} id={topic.id}/>
        )
    })
)}
export default Topics
