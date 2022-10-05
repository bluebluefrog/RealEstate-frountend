import React from "react";
import styles from "./UserLayout.module.css";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
const { Header, Footer, Content } = Layout;

export const UserLayout: React.FC = (props) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              language <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <span className={styles["title"]}>RE</span>
            </Link>
          </div>
          <div className={styles["desc"]}>
            Welcome to RE RealEstate Auction Web
          </div>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>RE</Footer>
    </Layout>
  );
};
