import axios from 'axios';
import { IPointNew, IPointSet, IPointUpdate } from 'interfaces/api';
import { baseUrl } from './authorization';

class PointApi {
  constructor() {}
  url = baseUrl;

  async searchPoints(token: string, query: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}points`;
    try {
      const response = await axios.get(url, config);
      console.log('in progress');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createPoint(token: string, point: IPointNew) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}points`;
    try {
      const response = await axios.post(url, point, config);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePointsSet(token: string, pointSet: IPointSet) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}points`;
    try {
      const response = await axios.patch(url, pointSet, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getPointsByTaskId(token: string, taskId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}points/${taskId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePointById(token: string, pointId: string, point: IPointUpdate) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}points/${pointId}`;
    try {
      const response = await axios.patch(url, point, config);
    } catch (error) {
      console.log(error);
    }
  }

  async deletePointById(token: string, pointId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}points/${pointId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PointApi();
