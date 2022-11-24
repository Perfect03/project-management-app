import axios from 'axios';
import { ITask, ITaskSet } from 'interfaces/api';
import { baseUrl } from './authorization';
import { getCookie } from './cokie';

class TaskApi {
  url = baseUrl;
  token: string = getCookie('token');
  config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };
  constructor() {}

  async getTasksInColumn(boardId: string, columnId: string) {
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createTaskInColumn(boardId: string, columnId: string, task: ITask) {
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.post(url, task, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async getTaskById(boardId: string, columnId: string, taskId: string) {
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTaskById(boardId: string, columnId: string, task: ITask) {
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.put(url, task, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTaskById(boardId: string, columnId: string, taskId: string) {
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    try {
      const response = await axios.delete(url, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async searchTask(searchQuery: string) {
    const config = {
      headers: { Authorization: `Bearer ${this.token}` },
      params: {
        search: searchQuery ? searchQuery : '',
      },
    };
    const url = `${this.url}tasksSet`;
    try {
      console.log(this.token);
      const response = await axios.get(url, config);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSetOfTasks(setOfTasks: ITaskSet) {
    const url = `${this.url}tasksSet`;
    try {
      const response = await axios.patch(url, setOfTasks, this.config);
    } catch (error) {
      console.log(error);
    }
  }

  async getTasksByBoardId(boardId: string) {
    const url = `${this.url}tasksSet/${boardId}`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TaskApi();
