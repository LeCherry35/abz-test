import $api from "../http"

export default class Services {
    static getPositions = () => {
        return $api.get(`/positions`)
      }
    static getToken = () => {
    return $api.get(`/token`)
    }
    static getProfiles =  (offset, count) => {
        return $api.get(`/users?offset=${offset}&count=${count}`)
    }
    static registerUser = (Token, data) => {
        return $api.post(`/users`, data, {headers:{Token,'content-type': 'multipart/form-data'}})
      }
}
