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
    const url = this.url + 'boards' + `/${boardId}` + '/columns';
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createColumnInBoard(boardId: string, column: IColumn) {
    const url = this.url + 'boards' + `/${boardId}` + '/columns';
    try {
      const response = await axios.post(url, column, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async getColumnById(boardId: string, columnId: string) {
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `/${columnId}`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateColumnById(boardId: string, columnId: string, column: IColumn) {
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `/${columnId}`;
    try {
      const response = await axios.put(url, column, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteColumnById(boardId: string, columnId: string) {
    const url = this.url + 'boards' + `/${boardId}` + '/columns' + `/${columnId}`;
    try {
      const response = await axios.delete(url, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async getColumnsByIdsList(list: string[], userId: string) {
    const config = {
      headers: { Authorization: `Bearer ${this.token}` },
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

  async updateColumnsSet(set: IColumn[]) {
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.patch(url, set, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async createColumnsSet(set: IColumn[]) {
    const url = this.url + 'columnsSet';
    try {
      const response = await axios.patch(url, set, this.config);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ColumnApi();
