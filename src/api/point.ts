import axios from 'axios';
import { IPointNew, IPointSet, IPointUpdate } from 'interfaces/api';
import { baseUrl } from './authorization';
import { getCookie } from './cokie';

class PointApi {
  token: string = getCookie('token');
  config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };

  constructor() {}
  url = baseUrl;

  async searchPoints(query: string) {
    const url = `${this.url}points`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {}
  }

  async createPoint(point: IPointNew) {
    const url = `${this.url}points`;
    try {
      const response = await axios.post(url, point, this.config);
    } catch (error) {}
  }

  async updatePointsSet(pointSet: IPointSet) {
    const url = `${this.url}points`;
    try {
      const response = await axios.patch(url, pointSet, this.config);
    } catch (error) {}
  }

  async getPointsByTaskId(taskId: string) {
    const url = `${this.url}points/${taskId}`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {}
  }

  async updatePointById(pointId: string, point: IPointUpdate) {
    const url = `${this.url}points/${pointId}`;
    try {
      const response = await axios.patch(url, point, this.config);
    } catch (error) {}
  }

  async deletePointById(pointId: string) {
    const url = `${this.url}points/${pointId}`;
    try {
      const response = await axios.delete(url, this.config);
    } catch (error) {}
  }
}

export default new PointApi();
