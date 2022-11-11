import axios from 'axios';
import { IFile } from 'interfaces/api';
import { baseUrl } from './authorization';

class FilesApi {
  constructor() {}
  url = baseUrl;

  async searchFiles(token: string, query: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}file&query=${query}`;
    try {
      const response = await axios.get(url, config);
      console.log('in progress');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(token: string, file: IFile) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}file`;
    try {
      const response = await axios.post(url, file, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getFilesByBoardId(token: string, boardId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}file/${boardId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFileById(token: string, fileId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}file/${fileId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      console.log(error);
    }
  }
}
