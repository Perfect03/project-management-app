import axios from 'axios';
import { IFile } from 'interfaces/api';
import { baseUrl } from './authorization';
import { getCookie } from './cokie';

class FileApi {
  constructor() {}
  url = baseUrl;
  token: string = getCookie('token');
  config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };

  async searchFiles(query: string) {
    const url = `${this.url}file&query=${query}`;
    try {
      const response = await axios.get(url, this.config);
      console.log('in progress');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(file: IFile) {
    const url = `${this.url}file`;
    try {
      const response = await axios.post(url, file, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async getFilesByBoardId(boardId: string) {
    const url = `${this.url}file/${boardId}`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFileById(fileId: string) {
    const url = `${this.url}file/${fileId}`;
    try {
      const response = await axios.delete(url, this.config);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileApi();
