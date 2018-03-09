import React from 'react'

const Message = ({message, selectMessage, starMessage}) => {
    const setMessageStyle = () => {
        let msg = "row message"
        if (message.selected === true) msg = msg + " selected"
        if (message.read === true) msg = msg + " read"
        else msg = msg + " unread"
        return msg;
    }

    const setStarStyle = () => {
        if (message.starred === true) return 'star fa fa-star'
        else return 'star fa fa-star-o'
    }


    const toggleSelect = () => {
        selectMessage(message.id)
    }

    const toggleStar = () => {
        starMessage(message)
    }

    return (
        <div className={setMessageStyle()}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" onChange={toggleSelect} checked={!!message.selected}/>
                    </div>
                    <div className="col-xs-2">
                        <i className={setStarStyle()} onClick={toggleStar}/>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {message.labels.map(label => <span key={label} className="label label-warning">{label}</span>)}
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
    )
}

export default Message