import config from './config'
const TokenService = {
    makeBasicAuth(username, password) {
        return window.btoa(`${username}:${password}`)
    },
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token);
    },
    getAuthToken(){
        return window.localStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken(){
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    hasAuthToken(){
        return !!TokenService.getAuthToken()
    }
}

export default TokenService