import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BoardService from '../service/BoardService';

function useFetch(url) {
    const [data, setData] = useState();

    useEffect(() => { //컴포넌트가 mount 되면 fetchUrl()이 실행됨 = componentDidMount
        //컴포넌트가 랜더링 될 때마다 특정 작업을 실행할 수 있도록 하는 HOOK.
        //mount, unmount, update시.
        //[] (deps) 내부에 값을 주면 값의 변화도 감지해서 검사함. 값이 바뀔때마다 호출된다.
        const fetchData = () => {
            axios.get(url).then(res=> {
                console.log(res.data);
                setData(res);
            });
        };
        fetchData();
    }, [url]);
    
    return data;
}

function List() {
    const listUrl = "/board/api/boardList.json"
    const resultData = useFetch(listUrl);
    
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

    return (
        <div className='container'>
            <h2 className="text-center">Board List</h2>
            
            <section>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th id="thId">글 번호</th>
                            <th id="thTitle">제목</th>
                            <th >등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultData && resultData.data.map((board) => {
                            const detailUrl = '/detail/'+board.uid;
                            return <tr key = {board.uid} id={board.uid}>
                                    <td> {board.uid} </td>
                                    <td> <Link to={detailUrl} className='linkStyle'>{board.title}</Link> </td>
                                    <td> {board.frstRegistDate} </td>
                                </tr>;
                                }
                            )
                        }
                    </tbody>
                </table>
                <div className='btn_section'>
                    <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#testInsertModal">등록</button>
                </div>
            </section>            
            
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

        </div>
        
    )
}
export default List;