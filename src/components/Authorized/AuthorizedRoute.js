import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

//扩展组件的使用场景:页面级别权限控制实现思路为对Route标签的渲染逻辑做控制。
//无权限控制的情况下，Route直接渲染页面级别的组件，判断无权限后，重定向到
//无权限界面。
//参数说明
//authority:通过权限参数 类型同Authorized中的定义
//component:权限通过后加载的组件。
//render:接收一个函数，返回权限通过后加载的组件
//path:路径  
//redirectPath:重定向路由(权限验证不通过时重定向到的路径)

{/* <AuthorizedRoute
    authority={authority}
    component={component}
    render={xxx}
    path={item.path}
    redirectPath='/exception/403'
>
</AuthorizedRoute> */}

export default ({authority, component: Component, redirectPath, render, ...rest}) => {
    return (
        <Authorized 
            authorize={authority}
            noMatch={
                <Route 
                    {...rest}
                    render={() => <Redirect to={redirectPath} />}
                />
            }
        >
            <Route
              {...rest}
              render={(props) => 
                (Component ? <Component {...props} /> : render(props))  
              }
            />
        </Authorized>
    )
}