import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {store} from "../store";

interface ErrorMessage {
    status: number,
    message?: string | null
}


/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number) => {
    const obj: ErrorMessage = {
        status
    }
    // 状态码判断
    switch (status) {
        case 302:
            obj.message = '接口重定向了！'
            break;
        case 400:
            obj.message = "发出的请求有错误，服务器没有进行新建或修改数据的操作==>" + status
            break;
        case 401: //重定向
            obj.message = "token:登录失效==>" + status + ":"
            // router.replace({
            //     path: '/Login',
            // });
            break;
        case 403:
            obj.message = "登录过期,用户得到授权，但是访问是被禁止的==>" + status
            // setTimeout(() => {
            //     router.replace({
            //         path: '/Login',
            //     });
            // }, 1000);
            break;
        case 404:
            obj.message = "网络请求不存在==>" + status
            break;
        case 406:
            obj.message = ("请求的格式不可得==>" + status)
            break;
        case 408:
            obj.message = (" 请求超时！")
            break;
        case 410:
            obj.message = ("请求的资源被永久删除，且不会再得到的==>" + status)
            break;
        case 422:
            obj.message = ("当创建一个对象时，发生一个验证错误==>" + status)
            break;
        case 500:
            obj.message = ("服务器发生错误，请检查服务器==>" + status)
            break;
        case 502:
            obj.message = ("网关错误==>" + status)
            break;
        case 503:
            obj.message = ("服务不可用，服务器暂时过载或维护==>" + status)
            break;
        case 504:
            obj.message = ("网关超时==>" + status)
            break;
        default:
            obj.message = ("其他错误错误==>" + status)
    }

    return obj
}

/* 实例化请求配置 */
const axiosInstance = axios.create({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        "Access-Control-Allow-Origin-Type": '*'
    },
    // 请求时长
    timeout: 1000 * 30,
    // 请求的base地址
    baseURL: "http://localhost:9000",
    // 表示跨域请求时是否需要使用凭证
    withCredentials: false,
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    validateStatus() {
        return true
    },
    //处理提交的数据
    transformRequest: [(data) => {
        data = JSON.stringify(data)
        return data
    }],
    //处理响应的数据
    transformResponse: [(data) => {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)
        }
        return data
    }]
})

// 请求拦截器
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    //获取token，并将其添加至请求头中
    let token = localStorage.getItem('token')
    if (token) {
        // @ts-ignore
        config.headers.Authorization = `${token}`;
    }
    return config
}, (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
})

// 响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    const status = response.status
    let msg = {}
    if (status < 200 || status >= 300) {
        msg = errorHandle(status)
        if (typeof response.data === 'string') {
            response.data = {msg}
        } else {
            response.data.msg = msg
        }
    }
    return response
}, (error) => {
    if (axios.isCancel(error)) {
        console.log('repeated request: ' + error.message)
    } else {
        // 错误抛到业务代码
        store.statusStore.changeStatus({
            type: 500,
            message: '请求超时或服务器异常，请检查网络或联系管理员！'
        })
    }
    return Promise.reject(error)
})

//接口请求通过格式
interface HttpRequest {
    // method?: Method,
    params?: any,
    headers?: {
        "content-type": string
    }
}

export const get = async (
    url: string,
    options?: HttpRequest
) => {
    return new Promise((resolve, reject)=>{
        axios.get('www.baidu.com').then(res=>{
            console.log(res);
        })
        // axiosInstance.get(url, {
        //     ...options,
        // }).then(res=>{
        //     resolve(res)
        // }).catch(err=>{
        //     reject(err)
        // })
    })
}

export const post = async (
    url: string,
    options: HttpRequest
) => {
    return new Promise((resolve, reject)=>{
        axiosInstance.post(url, {
            ...options,
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}

