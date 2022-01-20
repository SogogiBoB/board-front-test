import axios from 'axios';

const BOARD_API_BASE_URL = "/board/api/boardList.json";
const BOARD_API_INSERT_URL = "/board/api/insertBoard.json";
// const BOARD_API_PAGED_URL = "/board/api/pagedBoard";
const BOARD_API_UPDATE_URL = "/board/api/updateBoard";
const BOARD_API_DELETE_URL = "/board/api/deleteBoard";
const BOARD_API_SELECTBOARD_URL = "/board/api/selectBoard.json"
const BOARD_API_TOTALCNT_URL = "/board/api/totalCnt";

class BoardService {

    getPagedBoard(param, page, content, searchCode) {
        return axios.get(param, {params: {page:page, keyword:content, searchCode: searchCode}});
    }

    getBoard() {
        return axios.get(BOARD_API_BASE_URL);
    }

    createBoard(board) {
        return axios.post(BOARD_API_INSERT_URL, board);
    }

    updateBoard(board) {
        return axios.put(BOARD_API_UPDATE_URL, board);
    }

    deleteBoard(uid) {
        return axios.delete(BOARD_API_DELETE_URL + "/" + uid);
    }

    selectBoard(uid) {
        return axios.get(BOARD_API_SELECTBOARD_URL + "/" +   uid);
    }

    selectTotalCnt() {
        return axios.get(BOARD_API_TOTALCNT_URL);
    }
}

export default new BoardService();