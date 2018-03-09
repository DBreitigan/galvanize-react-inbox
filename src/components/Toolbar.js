import React from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {
    addMessageLabel,
    deleteSelectedMessages,
    removeMessageLabel,
    selectMessages,
    setCompose,
    toggleMessagesRead
} from "../actions"

const ToolBar = ({messages, compose, toggleMessagesRead, setCompose, selectMessages, deleteSelectedMessages, addMessageLabel, removeMessageLabel}) => {

    let selectedCount = messages.filter(msg => {
        return msg.selected === true
    }).length;

    const setMessageSelectStyle = () => {
        if (selectedCount === 0) return "fa fa-square-o"
        else if (selectedCount > 0 && selectedCount !== messages.length) return "fa fa-minus-square-o"
        else return "fa fa-check-square-o"
    }

    const selectButton = () => {
        selectMessages(messages)
    }

    const toggleCompose = () => {
        setCompose(!compose)
    }

    const markMessagesAsRead = () => {
        toggleMessagesRead(messages, true)
    }

    const markMessagesAsUnread = () => {
        toggleMessagesRead(messages, false)
    }

    const deleteMessages = () => {
        deleteSelectedMessages(messages)
    }

    const addLabel = (e) => {
        addMessageLabel(messages, e.target.value)
        e.target.value = "Apply label"
    }

    const removeLabel = (e) => {
        removeMessageLabel(messages, e.target.value)
        e.target.value = "Remove label"
    }

    const isDisabled = () => {
        if (selectedCount === 0) return "disabled"
    }

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{messages.filter(msg => msg.read !== true).length}</span>
                    {messages.filter(msg => msg.read !== true).length === 1 ? "unread message" : "unread messages"}
                </p>

                <a className="btn btn-danger" onClick={toggleCompose}>
                    <i className="fa fa-plus"/>
                </a>

                <button className="btn btn-default" onClick={selectButton}>
                    <i className={setMessageSelectStyle()}/>
                </button>

                <button className="btn btn-default" onClick={markMessagesAsRead} disabled={isDisabled()}>
                    Mark As Read
                </button>

                <button className="btn btn-default" onClick={markMessagesAsUnread} disabled={isDisabled()}>
                    Mark As Unread
                </button>

                <select className="form-control label-select" onChange={addLabel} disabled={isDisabled()}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" onChange={removeLabel} disabled={isDisabled()}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" onClick={deleteMessages} disabled={isDisabled()}>
                    <i className="fa fa-trash-o"/>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    messages: state.messages.all,
    compose: state.messages.compose
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleMessagesRead: toggleMessagesRead,
    setCompose: setCompose,
    deleteSelectedMessages: deleteSelectedMessages,
    addMessageLabel: addMessageLabel,
    selectMessages: selectMessages,
    removeMessageLabel: removeMessageLabel,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolBar)
