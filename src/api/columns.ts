import axios from 'axios';
import { baseUrl } from './authorization';
import { IColumn } from '../interfaces/api';

class ColumnApi {
  url = baseUrl;

  constructor() {}

  async getColumnsInBoard(token: string, boardId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createColumnInBoard(token: string, boardId: string, column: IColumn) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns';
    try {
      const response = await axios.post(url, column, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getColumnById(token: string, boardId: string, columnId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `${columnId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateColumnById(token: string, boardId: string, columnId: string, column: IColumn) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `${columnId}`;
    try {
      const response = await axios.put(url, column, config);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteColumnById(token: string, boardId: string, columnId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `${columnId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getColumnsByIdsList(token: string, list: string[], userId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: { ids: [...list], userId: userId },
    };
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateColumnsSet(token: string, set: IColumn[]) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.patch(url, set, config);
    } catch (error) {
      console.log(error);
    }
  }

  async createColumnsSet(token: string, set: IColumn[]) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.patch(url, set, config);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ColumnApi;