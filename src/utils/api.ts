import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosInstance,
    RawAxiosRequestHeaders,
} from 'axios'

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY,
})

// Read token from cookies and set to axios headers
api.interceptors.request.use(async (config) => {
    const key = 'token'
    if (typeof window == 'undefined') {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`
    } else {
        const token = localStorage.getItem('token')
        if (token?.length) config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

type AxiosHeadersType = RawAxiosRequestHeaders | AxiosHeaders

class CrudService {
    public axios: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance
    }

    async getAll(url: string, headers?: AxiosHeadersType) {
        try {
            const res = await api.get(url, {
                headers: headers,
            })
            return res.data
        } catch (e) {
            if (e instanceof AxiosError) throw e.response?.data
            throw e
        }
    }

    async get(url: string, headers?: AxiosHeadersType) {
        try {
            const res = await api.get(url, {
                headers: headers,
            })
            return res.data
        } catch (e) {
            throw e
        }
    }
}

const crudService = new CrudService(api)
export default crudService
