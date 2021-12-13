import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            boards: []
        }
		
    }
    componentDidMount() {
        BoardService.getBoards().then((res) => {
            this.setState({ boards: res.data});
        });
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
                                    <tr key = {board}>
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
            </div>
        );
    }
}

export default ListBoardComponent;