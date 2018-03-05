import React from 'react'

const ToolBar = ({messages, updateMessages, toggleCompose}) => {
    const setMessageSelectStyle = () => {
        let selectedCount = messages.filter(msg => {
            return msg.selected === true
        }).length;
        if (selectedCount === 0) return "fa fa-square-o"
        else if (selectedCount > 0 && selectedCount !== messages.length) return "fa fa-minus-square-o"
        else return "fa fa-check-square-o"
    }

    const selectButton = () => {
        let selectedCount = messages.filter(msg => {
            return msg.selected === true
        }).length;
        if (selectedCount === messages.length) {
            messages.map(msg => msg.selected = false)
        } else {
            messages.map(msg => msg.selected = true)
        }

        updateMessages(messages)
    }

    const markMessagesAsRead = () => {
        let messageIds =  messages.filter(msg => msg.selected === true).map(msg => msg.id)


        let command = {
            messageIds: messageIds,
            command: "read",
            read: true
        }

        updateMessages(command)
    }

    const markMessagesAsUnread = () => {
        let messageIds =  messages.filter(msg => msg.selected === true).map(msg => msg.id)


        let command = {
            messageIds: messageIds,
            command: "read",
            read: false
        }

        updateMessages(command)
    }

    const deleteMessages = () => {
        let messageIds =  messages.filter(msg => msg.selected === true).map(msg => msg.id)

        let command = {
            messageIds: messageIds,
            command: "delete"
        }

        updateMessages(command)
    }

    const addLabel = (e) => {
        let messageIds =  messages.filter(msg => msg.selected === true).map(msg => msg.id)

        let command = {
            messageIds: messageIds,
            command: "addLabel",
            label: e.target.value
        }

        e.target.value = "Apply label"

        updateMessages(command)
    }

    const removeLabel = (e) => {
        let messageIds =  messages.filter(msg => msg.selected === true).map(msg => msg.id)

        let command = {
            messageIds: messageIds,
            command: "removeLabel",
            label: e.target.value
        }

        e.target.value = "Remove label"

        updateMessages(command)
    }

    const isDisabled = () => {
        if (messages.filter(msg => {
                return msg.selected === true
            }).length === 0) {
            return "disabled"
        }
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

export default ToolBar