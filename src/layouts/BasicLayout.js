import React from 'react';
import DocumentTitle from 'react-document-title';
import Authorized from '../utils/Authorized';

const AuthorizedRoute =  Authorized.AuthorizedRoute;

class AA extends React.Component{
    render(){
        return (
            // <DocumentTitle>
            <div>
                <div>我是主界面</div>

                <AuthorizedRoute
                    path={'/'}
                    component={() => <div>我是测试成功界面</div>}
                    authority={['admin','user']}
                    redirectPath="/exception/403"
                />
            </div>
            // </DocumentTitle>
        )
    }
}

export default AA;