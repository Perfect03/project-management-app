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
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createTaskInColumn(boardId: string, columnId: string, task: ITask) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks`;
    try {
      const response = await axios.post(url, task, config);
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(boardId: string, columnId: string, taskId: string) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateTaskById(boardId: string, columnId: string, task: ITask) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const updatedTask = {
      title: task.title,
      order: task.order,
      description: task.description,
      columnId: columnId,
      userId: 0,
      users: [],
    };

    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks/${task._id!}`;

    try {
      await axios.put(url, updatedTask, config);
    } catch (error) {
      throw error;
    }
  }

  async deleteTaskById(boardId: string, columnId: string, taskId: string) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    try {
      const response = await axios.delete(url, config);
    } catch (error) {
      throw error;
    }
  }

  async searchTask(list?: string[], userId?: string, searchQuery?: string) {
    const config = {
      headers: { Authorization: `Bearer ${this.token}` },
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
      throw error;
    }
  }

  async updateSetOfTasks(setOfTasks: ITaskSet) {
    const token = getCookie('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${this.url}tasksSet`;
    try {
      const response = await axios.patch(url, setOfTasks, config);
    } catch (error) {
      throw error;
    }
  }

  async getTasksById(boardId: string) {
    const url = `${this.url}tasksSet/${boardId}`;
    try {
      const response = await axios.get(url, this.config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new TaskApi();
