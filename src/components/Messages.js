import React from 'react'
import Message from "./Message";

const Messages = ({messages, selectMessage, updateMessage}) => {


    return (
        <div>
            {messages.map(message => <Message key={message.id} message={message} selectMessage={selectMessage} updateMessage={updateMessage}/>)}
        </div>
    )
}

export default Messages