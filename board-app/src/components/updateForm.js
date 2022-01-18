import {React, useEffect, useState} from "react";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BoardService from "../service/BoardService";

const UpdateBoard = () =>{

    const [data, setData] = useState({});
    let navigation = useNavigate();

    const param = useParams();
    const paramUid  = param.uid;

    const [uid, setUid] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        const url = "/board/api/selectBoard.json/" + paramUid;
        function fetchData() {
                axios.get(url).then(res => {
                setData(res.data);
            });
        }
        fetchData();

        setUid(data.uid);
        setTitle(data.title);
        setContent(data.content);

    }, [data.uid, data.title, data.content, paramUid]);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }
        
    const changeContent = (event) => {
        setContent(event.target.value);
    }

    const saveChanges = () => {
        const board = {
            uid: uid,
            title: title,
            content: content
        }

        BoardService.updateBoard(board).then(res => {
            if(res.status === 200) {
                let detailUrl = '/detail/'+board.uid;
                alert("수정되었습니다.");
                navigation(detailUrl);
            } else {
                alert("수정 실패");
            }
        })
    }

    return (
        <div>        
            <div className="my-4">
                <h5 className="modal-title">Modify</h5>
            </div>
            <div>
                <div className = "form-group">
                    <label>글 번호</label>
                    <input type="text" className="form-control" value={uid || ''} readOnly/>
                </div>
                <div className = "form-group">
                    <label>제목</label>
                    <input type="text" placeholder="title" name="title" className="form-control" 
                    value={title || ''} onChange={changeTitle}/>
                </div>
                <div className = "form-group">
                    <label>내용</label>
                    <textarea placeholder="content" name="content" id="upd_textarea" className="form-control" 
                    value={content || ''} onChange={changeContent}/>
                </div>
            </div>
            <div className="btn_section">
                <button onClick={saveChanges} className="btn btn-primary my-2">Save changes</button>
                <a href="/" className="btn btn-secondary mx-2">Go back</a>
            </div>
        </div>
        
    );
}

export default UpdateBoard;