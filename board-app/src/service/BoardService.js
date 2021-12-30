import axios from 'axios';

const BOARD_API_BASE_URL = "/board/api/board";
const BOARD_API_PAGED_URL = "/board/api/pagedBoard";
const BOARD_API_UPDATE_URL = "/board/api/updateBoard";
const BOARD_API_DELETE_URL = "/board/api/deleteBoard";

class BoardService {

    getPagedBoard(params) {
        return axios.get(BOARD_API_PAGED_URL, {params});
    }

    getBoard() {
        return axios.get(BOARD_API_BASE_URL);
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    updateBoard(board) {
        return axios.put(BOARD_API_UPDATE_URL, board);
    }

    deleteBoard(uid) {
        return axios.delete(BOARD_API_DELETE_URL + "/" + uid);
    }
}

export default new BoardService();