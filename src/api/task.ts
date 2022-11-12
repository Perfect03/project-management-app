import axios from 'axios';
import { ITask, ITaskSet } from 'interfaces/api';
import { baseUrl } from './authorization';

class TaskApi {
  url = baseUrl;
  constructor() {}

  async getTasksInColumn(token: string, boardId: string, columnId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createTaskInColumn(token: string, boardId: string, columnId: string, task: ITask) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.post(url, task, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getTaskById(token: string, boardId: string, columnId: string, taskId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTaskById(token: string, boardId: string, columnId: string, task: ITask) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.put(url, task, config);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTaskById(token: string, boardId: string, columnId: string, taskId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      console.log(error);
    }
  }

  async searchTask(token: string, list?: string[], userId?: string, searchQuery?: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        ids: list ? [...list] : [''],
        userId: userId ? userId : '',
        search: searchQuery ? searchQuery : '',
      },
    };
    const url = `${this.url}tasksSet`;
    try {
      const response = await axios.get(url, config);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSetOfTasks(token: string, setOfTasks: ITaskSet) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}tasksSet`;
    try {
      const response = await axios.patch(url, setOfTasks, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getTasksById(token: string, boardId: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}tasksSet/${boardId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TaskApi();
