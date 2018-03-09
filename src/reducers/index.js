import {combineReducers} from 'redux'
import {
    ADD_MESSAGE, ADD_MESSAGE_LABEL, DELETE_SELECTED_MESSAGES, MESSAGES_RECEIVED, REMOVE_MESSAGE_LABEL, SELECT_MESSAGE,
    SET_COMPOSE, TOGGLE_MESSAGE_STAR, TOGGLE_MESSAGES_READ, TOGGLE_SELECT_MESSAGES
} from "../actions"

function messages(state = {compose: false, all: []}, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                all: action.messages
            }
        case SET_COMPOSE:
            return {
                ...state,
                compose: action.compose
            }
        case SELECT_MESSAGE:
            let updatedItem = state.all.find(msg => msg.id === action.messageId)
            return {
                ...state,
                all: [
                    ...state.all.splice(0, state.all.indexOf(updatedItem)),
                    {
                        ...updatedItem,
                        selected: !updatedItem.selected
                    },
                    ...state.all.splice(state.all.indexOf(updatedItem) + 1)
                ]
            }
        case ADD_MESSAGE:
            return {
                ...state,
                compose: false,
                all: [
                    ...state.all,
                    action.newMessage
                ]
            }
        case TOGGLE_SELECT_MESSAGES:
            return {
                ...state,
                all: state.all.map(msg => (
                    {
                        ...msg,
                        selected: action.selected
                    })
                )
            }
        case TOGGLE_MESSAGES_READ:
            return {
                ...state,
                all: state.all.map(msg => {
                    if (msg.selected === true) {
                        msg.selected = false;
                        msg.read = action.read;
                    }
                    return msg;
                })
            }
        case TOGGLE_MESSAGE_STAR:
            return {
                ...state,
                all: [
                    ...state.all.splice(0, state.all.indexOf(action.message)),
                    {
                        ...action.message,
                        starred: !action.message.starred
                    },
                    ...state.all.splice(state.all.indexOf(action.message) + 1)
                ]
            }
        case ADD_MESSAGE_LABEL:
            return {
                ...state,
                all: state.all.map(msg => {
                    if (msg.selected === true) {
                        msg.selected = false;
                        if (msg.labels.indexOf(action.label) < 0) {
                            msg.labels.push(action.label)
                        }
                    }
                    return msg;
                })
            }
        case REMOVE_MESSAGE_LABEL:
            return {
                ...state,
                all: state.all.map(msg => {
                    let labelIndex = msg.labels.indexOf(action.label)
                    if (msg.selected === true) {
                        msg.selected = false;
                        if (labelIndex >= 0) {
                            msg.labels.splice(labelIndex, 1)
                        }
                    }
                    return msg;
                })
            }
        case DELETE_SELECTED_MESSAGES:
            return {
                ...state,
                all: state.all.filter(msg => msg.selected !== true)
            }
        default:
            return state
    }
}

export default combineReducers({
    messages
})