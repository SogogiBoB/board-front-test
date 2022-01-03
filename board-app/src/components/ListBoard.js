import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BoardService from '../service/BoardService';

function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => { //컴포넌트가 mount 되면 fetchUrl()이 실행됨 = conponentDidMount
        const fetchData = async () => {
            const result = await axios.get(url);
            setData(result.data);
        };

        fetchData();

    }, [url]);
    
    return data;
}

const boardList = data.map((board) => 
    <tr key = {board.uid} id={board.uid}>
        <td> {board.uid} </td>
        <td> {board.title} </td>
        <td> {board.content} </td>
        <td> 
            <button className='btn btn-sm btn-secondary mx-2' data-bs-toggle="modal" data-bs-target="#testUpdateModal" onClick={ () => showUpdateModal(board)}>변경</button>
            <button className='btn btn-sm btn-danger' onClick={ () => deleteBoard(board.uid) }>삭제</button> 
        </td>
    </tr>
);


function List() {

    const listUrl = "/board/api/board"
    const data = useFetch(listUrl);

    const [uid, setUid] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }
        
    const changeContent = (event) => {
        setContent(event.target.value);
    }

    const createBoard = () => {
        let board = {
            title: title, 
            content: content
        };
        
        BoardService.createBoard(board).then(res=> {
            window.location.reload();
        });
    }

    const showUpdateModal = (board) => {
        setUid(board.uid);
        setTitle(board.title);
        setContent(board.content);
    }

    const updateBoard = () => {
        let board = {
            uid: uid, 
            title: title, 
            content: content
        };

        BoardService.updateBoard(board).then(res=> {
            setTitle('');
            setContent('');
            
            window.location.reload();
        })
    }

    const deleteBoard = (uid) => {
        BoardService.deleteBoard(uid).then(res => {
            let selectTr = document.getElementById(uid);
            selectTr.remove();
        });
    }

    return (
        <div className='container'>
            <h2 className="text-center">Board List</h2>

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
                        { boardList }
                    </tbody>
                </table>
                <div className='btnBox'>
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#testInsertModal">등록</button>
                </div>
            </div>            
            
            <div className="modal" id='testInsertModal' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">새글 등록</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className = "form-group">
                                    <label>제목</label>
                                    <input type="text" placeholder="title" name="title" className="form-control" 
                                    value={title} onChange={ changeTitle }/>
                                </div>
                                <div className = "form-group">
                                    <label>내용</label>
                                    <textarea placeholder="content" name="content" className="form-control" 
                                    value={content} onChange={ changeContent }/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={createBoard}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" id="testUpdateModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">변경</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => {setTitle(''); setContent('');}}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className = "form-group">
                                    <label>글 번호</label>
                                    <input type="text" className="form-control" value={uid || ''} readOnly/>
                                </div>
                                <div className = "form-group">
                                    <label>제목</label>
                                    <input type="text" placeholder="title" name="title" className="form-control" 
                                    value={title || ''} onChange={ changeTitle }/>
                                </div>
                                <div className = "form-group">
                                    <label>내용</label>
                                    <textarea placeholder="content" name="content" className="form-control" 
                                    value={content || ''} onChange={ changeContent }/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ () => {setTitle(''); setContent('');}}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateBoard}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default List;