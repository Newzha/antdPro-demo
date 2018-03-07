import React from 'react';
import Authorized from '../components/Authorized';

class AA extends React.Component{
    render(){
        console.log(this.props);
        return <div>
            aa
            <Authorized>
                
            </Authorized>
        </div>
    }
}

export default AA;