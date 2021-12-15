import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import BoardService from '../service/BoardService';

class ListBoardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            boards: [],
            title: '',
            content: '',
            writer: '',
            showHide : false
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.createBoards = this.createBoards.bind(this);
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
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
        this.setState({ showHide: !this.state.showHide });

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

                <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                    등록
                </Button>

                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>새글 등록</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className = "form-group">
                                <label>제목</label>
                                <input type="text" placeholder="title" name="title" className="form-control" 
                                value={this.state.title} onChange={this.changeTitleHandler}/>
                            </div>
                            <div className = "form-group">
                                <label>내용</label>
                                <textarea placeholder="content" name="content" className="form-control" 
                                value={this.state.content} onChange={this.changeContentHandler}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {this.createBoards(); this.setState({title: '', content: ''})}}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ListBoardComponent;