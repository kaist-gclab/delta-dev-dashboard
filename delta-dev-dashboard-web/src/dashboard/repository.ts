import axios, { AxiosInstance } from 'axios';
import { DashboardModel } from './types';

const ApiBase = 'https://api.devdashboard.delta.cqcqcqde.com/api/';

// 웹 프론트엔드는 HTTPS 및 basic 인증으로 보호됩니다.
const ApiKey = '46881bc9a5b3bc4a804c32f5f23c62ff0101d2adcb6b1683bbbc5f0a9feb4f83';

class DashboardRepository {
    private axios: AxiosInstance;
    constructor(apiBase: string, apiKey: string) {
        this.axios = axios.create({
            baseURL: apiBase,
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
    }
    async fetch() {
        const response = await this.axios.get<DashboardModel>('dashboard');
        return response.data;
    }
}

export default new DashboardRepository(ApiBase, ApiKey);
