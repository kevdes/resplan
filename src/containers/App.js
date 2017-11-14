import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


const App = (props) => (
  <Layout>
    <Header style={{ position: 'fixed', width: '100%', height: '56px' }}>
      <div className="logo">Res<strong>Plan</strong></div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{lineHeight: '56px'}}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{padding: '25px 25px', marginTop: 64 }}>
      <div style={{background: '#fff', padding: 24, minHeight: 380}}>Content hello <a>there</a></div>
    </Content>
    <Footer style={{textAlign: 'center', paddingTop: '0px' }}>
      Footer
    </Footer>
  </Layout>
);


export default App;


