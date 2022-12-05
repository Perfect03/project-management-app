import axios from 'axios';
import { baseUrl } from './authorization';
import { IColumn } from '../interfaces/api';
import { getCookie } from './cokie';

class ColumnApi {
  url = baseUrl;
  token: string = getCookie('token');
  config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };
  constructor() {}

  async getColumnsInBoard(boardId: string) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createColumnInBoard(boardId: string, column: IColumn) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns';
    try {
      const response = await axios.post(url, column, config);
    } catch (error) {
      throw error;
    }
  }

  async getColumnById(boardId: string, columnId: string) {
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `/${columnId}`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateColumnById(boardId: string, columnId: string, column: IColumn) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `/${columnId}`;
    try {
      const response = await axios.put(url, column, config);
    } catch (error) {
      throw error;
    }
  }

  async deleteColumnById(boardId: string, columnId: string) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `/${columnId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      throw error;
    }
  }

  async getColumnsByIdsList(userId: string) {
    const config = {
      headers: { Authorization: `Bearer ${this.token}` },
      params: { userId: userId },
    };
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateColumnsSet(set: { _id: string; order: number }[]) {
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.patch(url, set, this.config);
    } catch (error) {
      throw error;
    }
  }

  async createColumnsSet(set: IColumn[]) {
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.patch(url, set, this.config);
    } catch (error) {
      throw error;
    }
  }
}

export default new ColumnApi();
