import React, {Component} from 'react';
import './App.css';
import Messages from "./components/Messages";
import ToolBar from "./components/Toolbar";
import ComposeForm from "./components/ComposeForm"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {messages: [], compose: false}
    }

    async componentDidMount() {
        await this.getMessages()
    }

    toggleCompose = () => {
        this.setState((prevState) => {
            return {
                messages: prevState.messages,
                compose: !prevState.compose
            }

        })
    }

    getMessages = async () => {
        const getMessages = await fetch(`/api/messages`)
        const messages = await getMessages.json()

        this.setState({
            messages: messages._embedded.messages
        })
    }

    updateMessage = (message) => {
        let updatedItem = this.state.messages.find(msg => msg.id === message.id)
        this.setState((prevState) => {
            return {
                messages: [
                    ...prevState.messages.splice(0, prevState.messages.indexOf(updatedItem)),
                    message,
                    ...prevState.messages.splice(prevState.messages.indexOf(updatedItem) + 1)
                ]
            }
        })
    }

    addMessage = async (messageDetails) => {
        let response = await fetch(`/api/messages`, {
            method: 'POST',
            body: JSON.stringify(messageDetails),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        let newMessage = await response.json()

        this.setState({
            messages: [
                ...this.state.messages,
                newMessage],
            compose: false
        })
    }

    updateMessages = async (command) => {
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify(command),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        await this.getMessages()
    }

    render() {
        return (
            <div>
                <ToolBar messages={this.state.messages} updateMessages={this.updateMessages}
                         toggleCompose={this.toggleCompose}/>
                {this.state.compose ? <ComposeForm addMessage={this.addMessage}/> : null}
                <Messages messages={this.state.messages} selectMessage={this.updateMessage}
                          updateMessage={this.updateMessages}/>
            </div>
        );
    }
}

export default App;
