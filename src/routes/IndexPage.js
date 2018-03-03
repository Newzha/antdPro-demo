import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Button } from 'antd';
import 'antd/lib/button/style';

function IndexPage() {
  return (
    <div className={styles.normal}>
    
        {/* Button外层类名.myBtn会被加入hash值,但是组件内部的类名是预定义好的，不会有hash值
        所以保证less文件中定义类名时无hash值 */}
        <Button icon="search" className={styles.myBtn}>我是按钮</Button>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
