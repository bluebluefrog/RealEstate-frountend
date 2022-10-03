import React from "react";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

export const Header: React.FC = () => {
    return (
        <div className={styles['app-header']}>
            {/* top-header */}
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>Find your new house!</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu>
                                <Menu.Item>中文</Menu.Item>
                                <Menu.Item>English</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >
                        Language
                    </Dropdown.Button>
                    <Button.Group className={styles['botton-group']}>
                        <Button>Register</Button>
                        <Button>Login</Button>
                        <Button>Logout</Button>
                    </Button.Group>
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                {/*<img src={logo} alt="logo" className={styles['App-logo']} />*/}
                <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
                <Input.Search className={styles['search-input']}
                    placeholder={'pleace put in keyword of property'}
                />
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-menu']}>
                <Menu.Item key={1}>Home</Menu.Item>
                <Menu.Item key={2}>Property</Menu.Item>
                <Menu.Item key={3}>Auction History</Menu.Item>
                <Menu.Item key={4}>Watch List</Menu.Item>
                <Menu.Item key={5}>Wallet</Menu.Item>
                <Menu.Item key={6}>Personal Info</Menu.Item>
                <Menu.Item key={7}>Create Auction</Menu.Item>
                <Menu.Item key={8}>Upload Property</Menu.Item>
            </Menu>
        </div>
    )
}