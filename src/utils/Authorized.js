import React from 'react';
import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';

// //存在的问题:
// //一般的项目权限解决方案为按照角色维度分配权限:
// //admin:[1,2,3] guest:[3]
// //按照当前思路,用户在登录系统时权限角色值已经确认了。
// //currentAuthorize参数只需要传递一次即可,所以我们基于Authorized组件再次封装一层。
// //其他模块统一引此index.js文件中抛出的权限组件，在当前文件中做currentAuthorize
// //参数的传入。
// let currentAuthorize = getAuthority();

// const reloadAuthorized = () => {
//     currentAuthorize = getAuthority();
// }

// export { reloadAuthorized };

// // 这样封装高阶组件存在的问题是访问不到Authorized基础组件函数上挂载的
// // 扩展组件。
// // export default (props) => React.createElement(Authorized, {
// //     ...props,
// //     currentAuthorize
// // });

//以上的高阶封装存在缺陷。

//组件内部变量保存currentAuthorized的方案：
//保证了其他模块在引用此权限组件时已经传入了currentAuthorized
let Authorized = RenderAuthorized(getAuthority());

const reloadAuthorized = () => {
    Authorized = RenderAuthorized(getAuthority());
};
  
export { reloadAuthorized };
export default Authorized;





