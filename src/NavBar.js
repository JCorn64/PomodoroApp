import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon } from 'antd';
import "antd/dist/antd.css";

let mountNode = document.getElementById('root');

export default class NavBar extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="home">
            <span>
                <Icon type="home" />
                <span>Home</span>
            </span>
            <a href={'/'}></a>
        </Menu.Item>
        <Menu.Item key="history">
            <span>
                <Icon type="history" />
                <span>History</span>
            </span>
            <a href={'/history'}></a>
        </Menu.Item>
      </Menu>
    );
  }
}

ReactDOM.render(<NavBar />, mountNode);