import axios from 'axios';
import { IBoard } from 'interfaces/api';
import { baseUrl } from './authorization';

class BoardApi {
  url = baseUrl;
  constructor() {}

  async getAllBoards(token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createBoard(token: string, board: IBoard) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards';
    try {
      const response = await axios.post(url, board, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getBoardById(token: string, boardId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBoardById(token: string, boardId: string, board: IBoard) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}`;
    try {
      const response = await axios.put(url, board, config);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBoardById(token: string, boardId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getBoardByIdsList(token: string, list: string[]) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boardsSet';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getBoardsByUserId(token: string, userId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boardsSet' + `/${userId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new BoardApi();
