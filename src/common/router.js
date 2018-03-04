//路由配置对象基本结构如下

// key为加载组件的路径，使用当前对象的key和菜单配置对象中的path属性匹配合并。
// 整个路由对象只有一级，没有深层嵌套，为了方便生成route标签(路由组件出口)
// {
//     '/dashboard/analysis': {
//       //component属性为函数类型，表示路由匹配到当前key时动态加载的组件。
//       component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis'))
//     }
// }

//   dva中通过dynamic方法实现路由动态加载。
//   const Users = dynamic({
//     app,
//     models: () => [
//       import('./models/users'),
//     ],
//     component: () => import('./routes/Users'),
//   });
//   <Route path="/user" component={Users}></Route>
//   pro中为了配置方便，封装了dynamicWrapper函数。

//   pro中为什么做了菜单从路由配置中的抽离？
//   用户点击了菜单后一定会加载相应的组件，所以说菜单一定会有
//   path属性来对应组件，但是加载某一个路由组件时界面不一定有菜单配置。
//   如果说以菜单的格式配置路由信息，再生成菜单选项时，要除去不在菜单中显示的路由配置项。
//   另外生成route时需要写递归代码。
//   所以pro中的解决方案为将菜单和路由配置分离，菜单项单独由用户配置，然后通过
//   工具方法合并到路由配置中。

import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;
const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);
// dynamicWrapper函数
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

//将obj放在函数内部处理，这样就减少了一个外部依赖变量。
function getFlatMenu(menu) {
    let obj = {}
    menu.forEach((item) => {
        if(item.children){
            obj[item.path] = {...item};
            obj = {...obj, ...getFlatMenu(item.children)}
        }else{
            obj[item.path] = {...item};
        }
    })
    return obj;
}

//调用此函数，传入app对象，合并菜单和初始路由配置对象，生成最终的路由配置对象。
export const getRouterData = (app) => {
    const routerConfig = {//初始路由配置对象
        '/': {
          component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
        },
        // '/dashboard/analysis': {
        //   component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
        // },
        // '/dashboard/monitor': {
        //   component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
        // },
        // '/dashboard/workplace': {
        //   component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
        //   // hideInBreadcrumb: true,
        //   // name: '工作台',
        //   // authority: 'admin',
        // },
        // '/form/basic-form': {
        //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
        // },
        // '/form/step-form': {
        //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
        // },
        // '/form/step-form/info': {
        //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
        // },
        // '/form/step-form/confirm': {
        //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
        // },
        // '/form/step-form/result': {
        //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
        // },
        // '/form/advanced-form': {
        //   component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
        // },
        // '/list/table-list': {
        //   component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
        // },
        // '/list/basic-list': {
        //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
        // },
        // '/list/card-list': {
        //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
        // },
        // '/list/search': {
        //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
        // },
        // '/list/search/projects': {
        //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
        // },
        // '/list/search/applications': {
        //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
        // },
        // '/list/search/articles': {
        //   component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
        // },
        // '/profile/basic': {
        //   component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
        // },
        // '/profile/advanced': {
        //   component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
        // },
        // '/result/success': {
        //   component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
        // },
        // '/result/fail': {
        //   component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
        // },
        // '/exception/403': {
        //   component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
        // },
        // '/exception/404': {
        //   component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
        // },
        // '/exception/500': {
        //   component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
        // },
        // '/exception/trigger': {
        //   component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
        // },
        // '/user': {
        //   component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
        // },
        // '/user/login': {
        //   component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
        // },
        // '/user/register': {
        //   component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
        // },
        // '/user/register-result': {
        //   component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
        // },
        // '/user/::id': {
        //   // component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
        // }
    };

    const menuData = getFlatMenu(getMenuData());

    let routerData = {};
    //循环routerConfig匹配menuData
    Object.keys(routerConfig).forEach((path) => {
        //说明一下这里为什么要做菜单和路由的path匹配？
        //为了支持带参数的路由菜单，案例如下:
        //菜单中的path设置为/user/1,路由中的path设置为/user/:id
        //如果直接使用 === 则判断结果为两者不匹配。
        //需要借助path-to-regexp这个库来完成判断。
        const pathRegexp = pathToRegexp(path);
        const menuPath = Object.keys(menuData).find((menuPath) => pathRegexp.test(menuPath))

        let menuItem = {};
        if (menuPath) {
            menuItem = menuData[menuPath]; //拿到菜单配置
        }
        //menuData与routerConfig合并。用户新增的界面不在左侧菜单有入口的话直接
        //在routerConfig中配置即可。下面的语句不管能不能再menu中匹配到都会执行的。
        let router = routerConfig[path];
        //权限和name配置以 router.js 为准。
        router = {
            ...router,
            name : router.name || menuItem.name,
            authority: router.authority || menuItem.authority,
        }

        routerData[path] = router;
    })

    return routerData;
}







