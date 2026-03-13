import { Button, Form, Input, message } from "antd";
import { useLocation } from 'react-router-dom';
import styles from './index.module.less';

export default function Login() {
  const [form] = Form.useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const login = () => {
    
    const username = form.getFieldsValue(['username']).username || '';
    const passwordRow = form.getFieldsValue(['password']).password || '';

    if (!username) {
      console.log(123);
      alert('请输入用户名');
      return;
    }

    if (!passwordRow) {
      alert('请输入密码');
      return;
    }

    localStorage.setItem('username', username);

    const redirect = searchParams.get('redirect') || '/';
    alert('登录成功');
    setTimeout(() => {
      window.location.href = redirect;
    }, 500);
  };

  return (
    <div className={styles.login_container}>
      <Form
        className={styles.login_form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input style={{ width: 480, height: 48 }} placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password style={{ width: 480, height: 48 }} placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: 480, height: 48, marginTop: 60, background: '#646ED9', fontSize: 18 }}
            type="primary"
            onClick={login}
            block
          >
            登录
          </Button>
        </Form.Item>
      </Form>


    </div>
  );
}
