import axios from 'axios';
import type { AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://as-dev-ahp-d0gjcde4facrabc3.uksouth-01.azurewebsites.net/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});


const get = async (url: string, params: Record<string, any> = {}): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {

    throw error;
  }
};

const post = async (url: string, data: any): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (url: string, data: any): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const del = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  get,
  post,
  put,
  del,
};
