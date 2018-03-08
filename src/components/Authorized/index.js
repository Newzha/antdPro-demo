import React from 'react';
import checkPermissions from './checkPermissions';

class Authorized extends React.Component {
    render(){
        const { authorize, currentAuthorize, noMatch, children } = this.props;
        return checkPermissions(authorize, currentAuthorize, children, noMatch);
    }
}

export default Authorized;

{/* <Authorized 
    authorize={[1,2,3]}
    currentAuthorize={[1]}
    noMatch={}
/>
    <div>权限通过后显示的元素</div>
</Authorized> */}

//存在的问题:
//一般的项目权限解决方案为按照角色维度分配权限:
//admin:[1,2,3] guest:[3]
//按照当前思路的话