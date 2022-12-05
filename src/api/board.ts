import axios from 'axios';
import { IBoard } from 'interfaces/api';
import { baseUrl } from './authorization';
import { getCookie } from './cokie';

class BoardApi {
  url = baseUrl;
  constructor() {}

  async getAllBoards() {
    const token = getCookie('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createBoard(board: IBoard) {
    const token = getCookie('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards';
    try {
      const response = await axios.post(url, board, config);
    } catch (error) {
      throw error;
    }
  }

  async getBoardById(boardId: string) {
    const token = getCookie('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateBoardById(boardId: string, board: IBoard) {
    const token = getCookie('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}`;
    try {
      const response = await axios.put(url, board, config);
    } catch (error) {
      throw error;
    }
  }

  async deleteBoardById(boardId: string) {
    const token = getCookie('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      throw error;
    }
  }

  async getBoardByIdsList(list: string[]) {
    const token = getCookie('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: { ids: [...list] },
    };
    const config2 = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = this.url + 'boardsSet';
    try {
      const response = await axios.get(url, config2);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getBoardsByUserId(userId: string) {
    const token = getCookie('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boardsSet' + `/${userId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new BoardApi();
