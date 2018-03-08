function isPromise(obj) {
    return !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function' 
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定(可以通过的权限) Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 * @return target | Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
    //可通过权限不填写，表示默认查看所有
    if(!authority) return target;
    //字符串类型
    if(typeof authority === 'string'){
        if(authority === currentAuthority){
            return target;
        }
        return Exception;
    }

    //数组处理
    if(Array.isArray(authority)){
        if(authority.indexOf(currentAuthority) > -1){
            return target;
        }
        return Exception;
    }

    //函数处理(函数的返回值为bol,执行函数时将现有权限传入)
    if(typeof authority === 'function'){
        try {
            const bol = authority(currentAuthority);
            if (bol) {
                return target;
            }
            return Exception;
        } catch (error) {
            throw error;
        }
    }

    //promise处理
    // if(isPromise(authority)){
    // }

    throw new Error('unsupported parameters');
}

export default checkPermissions;