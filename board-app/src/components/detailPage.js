import {React, useEffect, useState} from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import BoardService from "../service/BoardService";

const SelectDetail = () =>{

    const [data, setData] = useState({});
    let navi = useNavigate();

    const param = useParams();
    const paramUid  = param.uid;

    const updateUrl = '/update/'+paramUid;
    

    useEffect(() => {
        const detailUrl = "/board/api/selectBoard.json/" + paramUid;

        function fetchData() {
                axios.get(detailUrl).then(res => {
                setData(res.data);
            });
        }
        fetchData();

    }, [data.uid, data.title, data.content, paramUid]);


    const deleteBoard = (uid) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            BoardService.deleteBoard(uid).then(res => {
                alert("삭제되었습니다.");
                navi("/");
            });
        }
    }

    return (
        <div className="detail_section">
            <div className="my-4">
                <h6>Detail</h6>
            </div>
            <div className="inner">
                <div className="title_section">
                    <div className="title_only">
                        <h3>{data.title}</h3>
                    </div>
                    <div className="date_box">
                        <div className="date_area">
                            등록일
                            <span>{data.frstRegistDate}</span>
                        </div>
                        <div className="date_area">
                            수정일
                            <span>{data.updateDate}</span>
                        </div>
                    </div>
                </div>
                <div className="content_area">
                    {data.content}
                </div>
            </div>
            
            <div className="btn_section">
                <Link to={updateUrl} className="btn btn-sm btn-primary">Update</Link>
                <button className='btn btn-sm btn-danger my-2 mx-2' onClick={ () => deleteBoard(data.uid) }>Del</button> 
                <Link to="/"  className="btn btn-sm btn-secondary">Go back</Link>
            </div>
        </div>
        
    );
}

export default SelectDetail;