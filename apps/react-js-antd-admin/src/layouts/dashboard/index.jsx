import { Layout } from 'antd';
import { Suspense } from 'react';

// components
import Main from './Main';
import { CircleLoading } from '@/components/loading';

const DashboardLayout = () => {
  return (
    <Layout>
      <Suspense fallback={<CircleLoading />}>
        <Layout>
          <Main />
        </Layout>
      </Suspense>
    </Layout>
  );
};

export default DashboardLayout;
