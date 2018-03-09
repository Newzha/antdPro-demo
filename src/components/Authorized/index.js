import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';

//在抛出的Authorize函数添加扩展组件。
Authorized.AuthorizedRoute = AuthorizedRoute;

//每次实例化组件之前调用函数传入currentAuthorize，
//通过组件内部变量来维护currentAuthorize。
let CURRENT = 'NULL';

const renderAuthorize = (currentAuthority) => {
    if (currentAuthority) {
        if (currentAuthority.constructor.name === 'Function') {
          CURRENT = currentAuthority();
        }
        if (currentAuthority.constructor.name === 'String') {
          CURRENT = currentAuthority;
        }
    } else {
        CURRENT = 'NULL';
    }

    //内部变量保存currentAuthorize的方式可以直接返回组件函数(这样可以引用到基础组件的扩展)，
    //但是props返回的是组件实例而不是组件函数，所以不能引用到组件扩展。
    return Authorized;
}

export { CURRENT };
export default renderAuthorize;
