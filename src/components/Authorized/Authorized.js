import React from 'react';
import checkPermissions from './checkPermissions';

//权限组件的基本思路,现有权限(currentAuthorize)和可通过权限(authorize)
//做比较，如果一致，则渲染children,否则渲染传入的noMatch
{/* <Authorized 
    authorize={[1,2,3]}
    noMatch={}
/>
    <div>权限通过后显示的元素</div>
</Authorized> */}

// export default ({authorize, currentAuthorize, noMatch = null, children}) => {
//     const childrenRender = typeof children === 'undefined' ? null : children;
//     return checkPermissions(authorize, currentAuthorize, childrenRender, noMatch); 
// }

export default ({authorize, noMatch = null, children}) => {
    const childrenRender = typeof children === 'undefined' ? null : children;
    return checkPermissions(authorize, childrenRender, noMatch); 
}