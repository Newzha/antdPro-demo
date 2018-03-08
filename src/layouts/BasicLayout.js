import React from 'react';
import Authorized from '../components/Authorized';


class AA extends React.Component{
    render(){
        console.log(this.props);
        return <div>
            <Authorized authorize={[1,2]} currentAuthorize={6} noMatch={<div>我是nomatch</div>}>
                <div>我是验证通过</div>
            </Authorized>
        </div>
    }
}

export default AA;