import axios from 'axios';

const BOARD_API_BASE_URL = "/board/api/boards";
const BOARD_API_PAGED_URL = "/board/api/pagedBoards";
const BOARD_API_UPDATE_URL = "/board/api/updateBoards";
const BOARD_API_DELETE_URL = "/board/api/deleteBoard";

class BoardService {

    getPagedBoards(params) {
        return axios.get(BOARD_API_PAGED_URL, {params});
    }

    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }

    createBoards(boards) {
        return axios.post(BOARD_API_BASE_URL, boards);
    }

    updateBoards(boards) {
        return axios.put(BOARD_API_UPDATE_URL, boards);
    }

    deleteBoards(uid) {
        return axios.delete(BOARD_API_DELETE_URL + "/" + uid);
    }
}

export default new BoardService();