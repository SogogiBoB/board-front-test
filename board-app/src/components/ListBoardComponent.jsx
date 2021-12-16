import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import BoardService from '../service/BoardService';

class ListBoardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            boards: [],
            uid: '',
            title: '',
            content: '',
            showRegistHide : false,
            showUpdateHide : false,

            page: 1,
            count: 0,
            pageSize: 10
        }

        this.pageSize = [5, 10, 15];
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.createBoards = this.createBoards.bind(this);
    }

    handleModalShowRegistHide() {
        this.setState({ showRegistHide: !this.state.showRegistHide })
    }

    handleModalShowUpdateHideEmpty() {
        this.setState({showUpdateHide: !this.state.showUpdateHide, title: '', content: ''})
    }

    handleModalShowUpdateHide(board) {
        console.log(board);

        let uid = board.uid;
        let title = board.title;
        let content = board.content;

        this.setState({
            uid : uid,
            title : title,
            content : content,
            showUpdateHide: !this.state.showUpdateHide})
    }

    getRequestParams(page, pageSize) {
        let params = {};

        if(page) {
            params["page"] = page - 1;
        }
        if(pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    retrieveBoards() {
        const {page, pageSize} = this.state;
        const params = this.getRequestParams(page, pageSize);

        BoardService.getPagedBoards(params).then((res) => {
            const { totalPages } = res.data;

            this.setState({
                boards: res.data.content,
                count: totalPages
            });

        });
    }

    componentDidMount() {
        this.retrieveBoards();
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }
    
    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
    }

    createBoards = () => {
        this.setState({ showRegistHide: !this.state.showRegistHide });

        let newBoard = {
            uid: null,
            title: this.state.title,
            content: this.state.content
        }
        
        BoardService.createBoards(newBoard).then(res => {
            this.componentDidMount();
            this.render();
        })
    }
    updateBoards = () => {
        this.setState({showUpdateHide: !this.state.showUpdateHide});

        let updateitems = {
            uid: this.state.uid,
            title: this.state.title,
            content: this.state.content
        }

        BoardService.updateBoards(updateitems).then(res => {
            alert("변경되었습니다.");
            this.componentDidMount();
            this.render();
            this.setState({title: '', content: ''});
        })
    }

    deleteBoards = (uid) => {
        BoardService.deleteBoards(uid).then(res => {
            this.componentDidMount();
            this.render();
        })
    }

    render() {
        return (
            <div className='container'>
                <h2 className="text-center">Boards List</h2>

                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>제목 </th>
                                <th>내용 </th>
                                <th>관리</th>
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
                                        <td> 
                                            <button className='btn btn-sm btn-secondary mx-2' onClick={() => this.handleModalShowUpdateHide(board)}>변경</button>
                                            <button className='btn btn-sm btn-danger' onClick={() => {this.deleteBoards(board.uid)}}>삭제</button> 
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='btnBox'>
                        <Button variant="primary" onClick={() => this.handleModalShowRegistHide()}>
                            등록
                        </Button>
                    </div>
                </div>

                <Modal show={this.state.showUpdateHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowUpdateHideEmpty()}>
                    <Modal.Title>수정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className = "form-group">
                                <label>글 번호</label>
                                <input type="text" className="form-control" value={this.state.uid} readOnly/>
                            </div>
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
                    <Button variant="secondary" onClick={() => this.handleModalShowUpdateHideEmpty()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {this.updateBoards(); this.setState({title: '', content: ''})}}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showRegistHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowRegistHide()}>
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
                    <Button variant="secondary" onClick={() => this.handleModalShowRegistHide()}>
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