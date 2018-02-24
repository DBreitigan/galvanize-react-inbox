import React from 'react'

const ToolBar = ({messages, updateAllMessages}) => {
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

        updateAllMessages(messages)
    }

    const markMessagesAsRead = () => {
        messages.map(msg => {
            if (msg.selected === true) {
                msg.read = true
                msg.selected = false
            }
            return msg
        });
        updateAllMessages(messages)
    }

    const markMessagesAsUnread = () => {
        messages.map(msg => {
            if (msg.selected === true) {
                msg.selected = false
                msg.read = false
            }
            return msg
        });
        updateAllMessages(messages)
    }

    const deleteMessages = () => {
        updateAllMessages(messages.filter(msg => {
            return msg.selected !== true
        }))
    }

    const addLabel = (e) => {
        messages.map(msg => {
            if (msg.selected === true && msg.labels.indexOf(e.target.value) < 0) {
                msg.labels.push(e.target.value)
            }
            return msg
        })
        e.target.value = "Apply label";

        updateAllMessages(messages)
    }

    const removeLabel = (e) => {
        messages.map(msg => {
            let msgIndex = msg.labels.indexOf(e.target.value)
            if (msg.selected === true && msgIndex >= 0) {
                msg.labels.splice(msgIndex, 1)
            }
            return msg
        })
        e.target.value = "Remove label";

        updateAllMessages(messages)
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