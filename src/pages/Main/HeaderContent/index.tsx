import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import {  LogoutOutlined, DownOutlined } from '@ant-design/icons';
import styles from './index.module.less';

function UserDropMenu() {
  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <Space
          onClick={() => {
            console.log('退出登录');
            localStorage.removeItem('username');
            window.location.href = '/login';
          }}
        >
          <LogoutOutlined />
          <span>退出登录</span>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.header_content}>
      <Space>
        <div>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Space>
              <span>{localStorage.getItem('username')}</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </Space>
    </div>
  );
}

export default UserDropMenu;
