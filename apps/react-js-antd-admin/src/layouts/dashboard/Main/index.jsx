import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router';

const Main = () => {
  return (
    <Content>
      <Outlet />
    </Content>
  );
};

export default Main;
