import { Layout } from 'antd';
import { Suspense } from 'react';

// components
import Main from './Main';

const DashboardLayout = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Main />
        </Layout>
      </Suspense>
    </Layout>
  );
};

export default DashboardLayout;
