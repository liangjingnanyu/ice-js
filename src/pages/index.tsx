import React from 'react';
import { Link } from 'ice';
import { Layout, Menu } from 'antd';
import { UserOutlined, ClockCircleOutlined, NotificationOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout(props: Props) {
  const { children } = props;
  const menuItems = [
    {
      key: 'employee',
      icon: <UserOutlined />,
      label: '人员管理',
      children: [
        { key: 'employee-list', label: <Link to="/employee/list">员工列表</Link> },
        { key: 'department', label: <Link to="/employee/department">部门管理</Link> },
      ],
    },
    {
      key: 'attendance',
      icon: <ClockCircleOutlined />,
      label: '考勤管理',
      children: [
        { key: 'attendance-record', label: <Link to="/attendance/record">考勤记录</Link> },
        { key: 'leave-manage', label: <Link to="/attendance/leave">请假管理</Link> },
      ],
    },
    {
      key: 'announcement',
      icon: <NotificationOutlined />,
      label: '信息发布',
      children: [
        { key: 'notice', label: <Link to="/announcement/notice">公告管理</Link> },
        { key: 'news', label: <Link to="/announcement/news">新闻管理</Link> },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontSize: '20px', padding: '0 20px' }}>
        企业后台管理系统
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} items={menuItems} />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
