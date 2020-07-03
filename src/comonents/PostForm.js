import React from 'react';
import { connect } from 'react-redux';
import { createPost, showAlert } from '../Redux/actions';
import Alert from './alert';

class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        const {title} = this.state
        // if title is empty we won`t create post
        debugger
        if(!title.trim()) {
            return this.props.showAlert("Title is Empty")
        }
        const newPost = {
            title,id: Date.now().toString()
        }
        this.props.createPost(newPost)
        this.setState({title:''})
    }
    changeInputHandler = event => {
        event.persist()
    this.setState(prev => ({...prev, ...{
        [event.target.name]: event.target.value
    }}))
    }

    render() {
        return(
            <form onSubmit={this.submitHandler}>
                {this.props.alert&&<Alert text={this.props.alert}/>}
                <div className="form-group">
                <label htmlFor="exampleInputPassword1">Title Post</label>
                <input 
                type="text" 
                className="form-control"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.changeInputHandler}/>
                </div>
                <button className="btn btn-success" type='submit'>Create</button>
            </form>
        )
    }
}

const mapDispatchToProps = {
    createPost,
    showAlert
}

const mapStateToProps =(state) => {
    return {
        alert: state.app.alert
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostForm)