export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'

export function fetchMessages() {
    return async (dispatch) => {
        const getMessages = await fetch(`/api/messages`)
        const messages = await getMessages.json()

        dispatch({
            type: MESSAGES_RECEIVED,
            messages: messages._embedded.messages
        })
    }
}

export const SET_COMPOSE = 'SET_COMPOSE'

export function setCompose(compose) {
    return async (dispatch) => {
        dispatch({
            type: SET_COMPOSE,
            compose: compose
        })
    }
}

export const SELECT_MESSAGE = 'SELECT_MESSAGE'

export function selectMessage(messageId) {
    return async (dispatch) => {
        dispatch({
            type: SELECT_MESSAGE,
            messageId: messageId
        })
    }
}

export const ADD_MESSAGE = 'ADD_MESSAGE'

export function addMessage(messageDetails) {
    return async (dispatch) => {
        let response = await fetch(`/api/messages`, {
            method: 'POST',
            body: JSON.stringify(messageDetails),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        let newMessage = await response.json()
        dispatch({
            type: ADD_MESSAGE,
            newMessage: newMessage
        })
    }
}

export const ADD_MESSAGE_LABEL = 'ADD_MESSAGE_LABEL'

export function addMessageLabel(messages, label) {
    return async (dispatch) => {
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.filter(msg => msg.selected === true).map(msg => msg.id),
                command: "addLabel",
                label: label
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        dispatch({
            type: ADD_MESSAGE_LABEL,
            label: label
        })
    }


}

export const TOGGLE_SELECT_MESSAGES = 'TOGGLE_SELECT_MESSAGE'

export function selectMessages(messages) {
    let selectedCount = messages.filter(msg => {
        return msg.selected === true
    }).length;

    let selected = selectedCount !== messages.length;

    return async (dispatch) => {
        dispatch({
            type: TOGGLE_SELECT_MESSAGES,
            selected: selected
        })
    }
}

export const TOGGLE_MESSAGES_READ = 'TOGGLE_MESSAGES_READ'

export function toggleMessagesRead(messages, read) {
    return async (dispatch) => {
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.filter(msg => msg.selected === true).map(msg => msg.id),
                command: "read",
                read: read
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        dispatch({
            type: TOGGLE_MESSAGES_READ,
            read: read
        })
    }
}

export const TOGGLE_MESSAGE_STAR = 'TOGGLE_MESSAGE_STAR'

export function toggleMessageStar(message) {
    return async (dispatch) => {
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: [message.id],
                command: "star",
                star: !message.starred
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        dispatch({
            type: TOGGLE_MESSAGE_STAR,
            message: message
        })
    }
}


export const REMOVE_MESSAGE_LABEL = 'REMOVE_MESSAGE_LABEL'

export function removeMessageLabel(messages, label) {
    return async (dispatch) => {
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.filter(msg => msg.selected === true).map(msg => msg.id),
                command: "removeLabel",
                label: label
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        dispatch({
            type: REMOVE_MESSAGE_LABEL,
            label: label
        })
    }


}

export const DELETE_SELECTED_MESSAGES = 'DELETE_SELECTED_MESSAGES'

export function deleteSelectedMessages(messages) {
    return async (dispatch) => {
        let messageIds = messages.filter(msg => msg.selected === true).map(msg => msg.id)

        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messageIds,
                command: "delete",
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        dispatch({
            type: DELETE_SELECTED_MESSAGES,
            messageIds: messageIds
        })
    }
}
