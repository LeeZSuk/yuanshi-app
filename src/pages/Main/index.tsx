import { Layout, Menu, MenuProps } from 'antd';
import styles from './index.module.less';
import  { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HeaderContent from './HeaderContent';
import Loading from '@/components/Loading';
const { Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: '工单',
    children: [
      { key: '/list', label: '工单列表' },
    ],
  },
  {
    type: 'divider',
  },  
];
export default function App() {
  const [currentPath, setCurrentPath] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  const handleMenuClick = (item: any) => {
    if (currentPath === item.key) return;
    navigate(item.key);
  };

  if (currentPath == '') {
    return null;
  }
  return  <div className={styles.layout}>
      <div className={styles.sider}>
        <div className={styles.logo}>
          管理平台
        </div>
        <Menu
          className={styles.menu}
          defaultOpenKeys={['/' + currentPath.split('/')[1]]}
          selectedKeys={[currentPath]}
          mode="inline"
          inlineIndent={12}
          items={items}
          onClick={handleMenuClick}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <HeaderContent />
        </div>
        <Content className={styles.content}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Content>
      </div>
    </div>;
}