import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Dropdown, Avatar, Icon, Menu } from 'antd';

const Header = styled(Layout.Header)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Logo = styled.div`
  color: white;
  flex-grow: 1;
  font-size: 20px;
  font-family: initial;
`;

const Content = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 50px;
`;

const Footer = styled(Layout.Footer)`
  width: 100%;
  text-align: center;
`;

const UserPanel = styled.div`
  background-color: #3b444c;
  height: 30px;
  vertical-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: white 0px 0px 3px;
  border-radius: 4px;
  padding: 8px 10px;
`;

const UserInfo = styled.span`
  color: white;
  font-size: 15px;
  margin-right: 12px;
`;

function MainWrapper({ children, Logout, userEmail }) {
  return (
    <React.Fragment>
      <Header>
        <Logo>Task manager</Logo>
        <UserPanel>
          <UserInfo>{userEmail}</UserInfo>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Icon type="logout" />
                  {Logout}
                </Menu.Item>
              </Menu>
            }
          >
            <Avatar style={{ backgroundColor: 'grey' }}>
              <Icon type="user" style={{ fontSize: '25px', color: 'white' }} />
            </Avatar>
          </Dropdown>
        </UserPanel>
      </Header>
      <Content>{children}</Content>
      <Footer>Task manager example by <a target='_blank' href='https://www.linkedin.com/in/vadim-isakov/'>Vadim Isakov</a></Footer>
    </React.Fragment>
  );
}

MainWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  Logout: PropTypes.object,
  userEmail: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default MainWrapper;
