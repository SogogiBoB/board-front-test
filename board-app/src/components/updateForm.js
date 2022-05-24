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
    const [extension, setExtension] = useState();
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    useEffect(() => {
        const url = "/board/api/selectBoard.json/" + paramUid;
        function fetchData() {
                axios.get(url).then(res => {
                setData(res.data);

                console.log(res.data);
                console.log(res.data.fileName);
            });
        }
        fetchData();
        
        setUid(data.uid);
        setTitle(data.title);
        setContent(data.content);
        setFileName(data.fileName);

    }, [data.uid, data.title, data.content, paramUid]);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }
        
    const changeContent = (event) => {
        setContent(event.target.value);
    }

    const mkThumbnailUrl = () => {
        let file = document.getElementById("file").files[0];
        let fileNm = file.name;
        let extensionFm = fileNm.split('.')[1];

        setFile(file);
        setFileName(fileNm);
        setExtension(extensionFm);
    }

    const saveChanges = () => {
        const board = {
            uid: uid,
            title: title,
            content: content,
            extension: extension,
            fileName: fileName
        }

        const fileData = {
            file: file,
            fileName: fileName,
            extension: extension
        }

        if(board.fileName !== null) {
            const formData = new FormData();
            formData.append('file', fileData.file);

            axios.post("/api/upload.json", formData, {headers: {
                "Content-Type": `multipart/form-data`,
              },
            });
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
            <form encType="multipart/form-data">
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
                    <div className = "form-group my-3" id="file_section">
                        <label>썸네일</label>
                        <div id="fileName_section">
                            <div>
                                <span className="form-control" readonly="true">{fileName}</span>
                            </div>
                            <div>
                                <input type="file" name="file" id="file" className="form-control" onChange={mkThumbnailUrl}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="btn_section">
                <button onClick={saveChanges} className="btn btn-primary my-2">Save changes</button>
                <a href="/" className="btn btn-secondary mx-2">Go back</a>
            </div>
        </div>
        
    );
}

export default UpdateBoard;