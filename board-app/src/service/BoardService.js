import axios from 'axios'; 

const BOARD_API_BASE_URL = "/api/boards"; 

class BoardService {

    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }

    createBoards(boards) {
        return axios.post(BOARD_API_BASE_URL, boards);
    }
}

export default new BoardService();