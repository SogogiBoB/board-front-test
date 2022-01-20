import React, {useState, useLayoutEffect} from 'react';
import { Link } from 'react-router-dom';
import BoardService from '../service/BoardService';
import Pagination from 'react-js-pagination';
import {Modal, Button, Form, Table} from 'react-bootstrap';
import axios from 'axios';

function List() {
    const listUrl = "/board/api/pagedBoard"
    
    //state 선언부(모아놓지 않아도 됨)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState();
    const [data, setData] = useState([]);

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //비동기방식. render와 painting이 모두 끝난 후 실행. 
    //useEffect(() => {
    //    
    //});


    //동기방식. render 후 painting 전에 실행. 로직이 복잡한 경우 사용자가 레이아웃을 보는데까지 시간이 오래 걸릴수도 있음
    useLayoutEffect( () => {
        const selectBoard = () => {
            let keyword = document.getElementById("searchInput").value;
            let selectedSearchCode = document.getElementById("select_box").value;

            if(keyword ==='') {
                BoardService.getPagedBoard(listUrl, page)
                .then(res=> {
                    setData(res.data.content);
                    setTotalCnt(res.data.totalElements);
                });
            } else {
                BoardService.getPagedBoard(listUrl, page, keyword, selectedSearchCode)
                .then(res=> {
                    setData(res.data.resultList);
                    setTotalCnt(res.data.resultCnt);
                });
            }
        };
        selectBoard();
    },[page]);//dependency array 내부에 넣어준 변수의 값(state)의 변화를 감지해서 바뀌는 즉시 내부 함수 실행함

    //page 변경 시 setPage => useEffect가 변경을 감지
    const HandlePageChange = (page) => {
        setPage(page);
    };

    //Modal 에서 입력하는 title을 state에 저장
    const changeTitle = (event) => {
        setTitle(event.target.value);
    }
    //Modal 에서 입력하는 content를 state에 저장
    const changeContent = (event) => {
        setContent(event.target.value);
    }

    //Modal 등록 버튼 클릭
    const createBoard = () => {
        let board = {
            title: title, 
            content: content
        };
        handleClose();
        
        BoardService.createBoard(board).then(
            window.location.reload()
        );
    }

    const searchThisBoard = () => {
        //다른 페이지를 보다가 검색을 한 경우 페이지를 1로 초기화
        setPage(1);

        let keyword = document.getElementById("searchInput").value;
        let selectedSearchCode = document.getElementById("select_box").value;
        
        if(selectedSearchCode === '') {//검색 조건을 고르지 않은 경우
            alert("검색 조건을 선택해주세요");
            return;
        } else {
            if(keyword === '') {//검색 조건은 골랐지만 검색어가 없는 경우
                alert("검색어를 입력해주세요");
                return;
            }
        }

        //조건절에서 return 되지 않으면 실행
        BoardService.getPagedBoard(listUrl, page, keyword, selectedSearchCode)
        .then(res=> {
            setData(res.data.resultList);
            setTotalCnt(res.data.resultCnt);
        });
    }

    //검색 초기화
    const resetKeyword = () => {
        document.getElementById("searchInput").value = '';

        BoardService.getPagedBoard(listUrl, page)
        .then(res=> {
            setData(res.data.content);
            setTotalCnt(res.data.totalElements);
        });
    }

    const massiveInsert = () => {
        axios.post("/board/api/massiveInsert").then( window.location.reload());
    }

    return (
        <div className='container'>
            <h2 className="text-center">Board List</h2>
            <section id="search_section">
                <div id="search_box">
                    <Form.Select id="select_box" size='sm' title='gubun'>
                        <option value="">선택</option>
                        <option value="no">글번호</option>
                        <option value="ti">제목</option>
                    </Form.Select>
                    <input type="text" className='form-control' id="searchInput" list="board-list" placeholder='검색어를 입력해주세요.'/>
                    {/* 입력한 option으로 input에 datalist를 만들어주는 HTML 태그. js없이도 사용 가능 */}
                    <datalist id="board-list"> 
                        {data.map((board) => {
                            return <option key={board.uid} value={board.title} ></option>
                        })}
                    </datalist>
                    <Button className='btn-sm btn-primary searchBtn' onClick={searchThisBoard}>검색</Button>
                    <Button className='btn-sm btn-secondary searchBtn' onClick={resetKeyword}>Reset</Button>
                </div>
            </section>
            <section>
                <Table hover>
                    <thead className='table-dark'>
                        <tr>
                            <th id="thId">글번호</th>
                            <th id="thTitle">제목</th>
                            <th id="thRegist">등록일</th>
                        </tr>
                    </thead>
                    <tbody id="boardListTbody">
                        {/* 데이터 forEach => 데이터(배열)을 기준으로 삼항연산 */}
                        {data.length > 0 
                            ? (data.map((board) => {
                                const detailUrl = '/detail/'+board.uid;
                                return  <tr key = {board.uid} className={board.uid}>
                                            <td> {board.uid} </td>
                                            <td> <Link to={detailUrl} className='linkStyle'>{board.title}</Link> </td>
                                            <td> {board.frstRegistDate} </td>
                                        </tr>;
                                })
                            ) 
                            : (<tr><td colSpan="3">No data</td></tr>)
                        }
                    </tbody>
                </Table>

                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={totalCnt || 0}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={HandlePageChange} />

                <div className='btn_section'>
                    <Button variant="primary" onClick={handleShow}> 등록 </Button>
                </div>
                <div className='btn_section'>
                    <Button className='btn btn-sm btn-warning my-2'onClick={massiveInsert}>대량 등록(30개)</Button>
                </div>
            </section>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>새글 등록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className = "form-group">
                        <label>제목</label>
                        <input type="text" placeholder="title" name="title" className="form-control" value={title} onChange={ changeTitle }/>
                    </div>
                    <div className = "form-group">
                        <label>내용</label>
                        <textarea placeholder="content" name="content" className="form-control" value={content} onChange={ changeContent }/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createBoard}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}
export default List;