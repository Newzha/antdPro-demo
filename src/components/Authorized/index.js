{/* <Authorized 
    authorize={[1,2,3]}
    currentAuthorize={[1]}
    noMatch={}
/>
    <div>权限通过后显示的元素</div>
</Authorized> */}

import React from 'react';

function authorizeCount() {
    return false;
}

class Authorized extends React.Component {
    render(){
        const { authorize, currentAuthorize, noMatch, children } = this.props;
        const result = authorizeCount(authorize, currentAuthorize);

        if(result){
            return children;
        }else{
            return noMatch
        }
    }
}