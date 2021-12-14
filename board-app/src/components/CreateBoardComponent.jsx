import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            writer: '',
            viewCnt: 0
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.createBoards = this.createBoards.bind(this);
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
    }

    createBoards = (event) => {
        event.preventDefault();
        let boards = {
            title: this.state.title,
            content: this.state.content,
            writer: this.state.writer,            
            viewCnt: this.state.viewCnt
        };
        console.log("board => "+ JSON.stringify(boards));
        BoardService.createBoard(boards).then(res => {
            this.props.history.push('/boards');
        });
    }

    cancel() {
        this.props.history.push('/boards');
    }


    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">새글을 작성해주세요</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Title </label>
                                        <input type="text" placeholder="title" name="title" className="form-control" 
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 내용  </label>
                                        <textarea placeholder="content" name="content" className="form-control" 
                                        value={this.state.content} onChange={this.changeContentHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.createBoards}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBoardComponent;