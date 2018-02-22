import React from 'react'
import Message from "./Message";

const Messages = ({messages, updateMessage}) => {


    return (
        <div>
            {messages.map(message => <Message key={message.id} message={message} updateMessage={updateMessage}/>)}
        </div>
    )
}

export default Messages