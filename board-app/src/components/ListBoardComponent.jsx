import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ListBoardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            boards: [],
            title: '',
            content: '',
            writer: ''
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.createBoards = this.createBoards.bind(this);
    }

    componentDidMount() {
        BoardService.getBoards().then((res) => {
            this.setState({ boards: res.data});
        });
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
        console.log(this.state.title);
    }
    
    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
        console.log(this.state.content);
    }

    createBoards = (e) => {
        e.preventDefault();

        let newBoard = {
            uid: null,
            title: this.state.title,
            content: this.state.content,
            writer: "조준현",
            viewCnt: 0
        }
        
        BoardService.createBoards(newBoard).then(res => {
            this.componentDidMount();
            this.render();
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Boards List</h2>

                <div className ="row">
                
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>제목 </th>
                                <th>내용 </th>
                                <th>작성자 </th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.uid}>
                                        <td> {board.uid} </td>
                                        <td> {board.title} </td>
                                        <td> {board.content} </td>
                                        <td> {board.writer} </td>
                                        <td> {board.viewCnt} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h5 className="text-center">새글 작성</h5>
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
                                    <button className="btn btn-danger" style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListBoardComponent;