import { Spin } from 'antd';
import styles from './index.module.less';

type IProps = {
  mask?: boolean;
};

const Loading = ({ mask }: IProps) => {
  return (
    <div className={styles.pageLoading}>
      {mask ? <div className={styles.mask}></div> : null}
      <Spin className={styles.dotLoading} />
    </div>
  );
};

export default Loading;
