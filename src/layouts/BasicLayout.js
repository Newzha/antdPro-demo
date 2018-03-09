import React from 'react';
import Authorized from '../utils/Authorized';

const AuthorizedRoute =  Authorized.AuthorizedRoute;

class AA extends React.Component{
    render(){
        return <div>
            <div>我是主界面</div>
            <AuthorizedRoute
                path={'/'}
                component={() => <div>我是城管</div>}
                authority={['admin','user']}
                redirectPath="/exception/403"
            />
        </div>
    }
}

export default AA;