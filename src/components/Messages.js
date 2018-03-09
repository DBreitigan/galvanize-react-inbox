import React from 'react'
import Message from "./Message";
import {bindActionCreators} from "redux"
import {selectMessage, toggleMessageStar} from "../actions"
import {connect} from "react-redux"

const Messages = ({messages, selectMessage, toggleMessageStar}) => {
    return (
        <div>
            {messages.map(message => <Message key={message.id} message={message} selectMessage={selectMessage} starMessage={toggleMessageStar}/>)}
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.all,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    selectMessage: selectMessage,
    toggleMessageStar: toggleMessageStar
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages)