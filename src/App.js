import React from 'react';
import './App.css';
import Messages from "./components/Messages";
import ToolBar from "./components/Toolbar";
import ComposeForm from "./components/ComposeForm"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

const App = ({compose}) => {
    return (
        <div>
            <ToolBar/>
            {compose ? <ComposeForm/> : null}
            <Messages/>
        </div>
    );
}

const mapStateToProps = state => ({
    compose: state.messages.compose,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
