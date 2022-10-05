import React from "react";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import {Link, useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/user/slice";

import { useSelector } from "../../redux/hooks";

export const Header: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    let userInfo = useSelector(state => state.user.userInfo);

    const clickLogout = () => {
        dispatch(logout());
        history.push("/");
    };

    const checkLogin = (): boolean => {
        if (userInfo == null) {
            alert("need login first!")
            return false;
        }
        return true;
    };

    const watchList = () => {
        if(checkLogin()){
            history.push("/watchList");
        }else{
            return;
        }
    };

    const wallet = () => {
        if(checkLogin()){
            history.push("/wallet");
        }else{
            return;
        }
    };

    const auctionHistory = () => {
        if(checkLogin()){
            history.push("/auctionHistory");
        }else{
            return;
        }
    };

    const personInfo = () => {
        if(checkLogin()){
            history.push("/personInfo");
        }else{
            return;
        }
    };

    const createAuction = () => {
        if(checkLogin()){
            history.push("/createAuction");
        }else{
            return;
        }
    };

    const uploadProperty = () => {
        if(checkLogin()){
            history.push("/uploadProperty");
        }else{
            return;
        }
    };

    return (
        <div className={styles['app-header']}>
            {/* top-header */}
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>Find your new house!</Typography.Text>
                    <Dropdown.Button
                        style={{marginLeft: 15}}
                        overlay={
                            <Menu>
                                <Menu.Item>中文</Menu.Item>
                                <Menu.Item>English</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined/>}
                    >
                        Language
                    </Dropdown.Button>
                    {userInfo==null?
                        (<Button.Group className={styles['botton-group']}>
                        <Button onClick={()=>{history.push("/register")}}>Register</Button>
                        <Button onClick={()=>{history.push("/sign")}}>Login</Button>
                    </Button.Group>)
                    :(<Button.Group className={styles['botton-group']}>
                            <Typography.Text strong>Welcome to RE {userInfo.username}</Typography.Text>
                            <Button onClick={clickLogout}>Logout</Button>
                        </Button.Group>)}
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                {/*<img src={logo} alt="logo" className={styles['App-logo']} />*/}
                <Typography.Title level={3} className={styles.title}>RE</Typography.Title>
                <Input.Search className={styles['search-input']}
                              placeholder={'pleace put in keyword of property'}
                              onSearch={(keywords) => history.push("/search/" + keywords)}/>
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-menu']}>
                <Menu.Item key={1}><Link to={"/"}>Home</Link></Menu.Item>
                <Menu.Item key={2}><Link to={"/search"}>Property</Link></Menu.Item>
                <Menu.Item key={3} onClick={auctionHistory}>Auction History</Menu.Item>
                <Menu.Item key={4} onClick={auctionHistory}>Watch List</Menu.Item>
                <Menu.Item key={5} onClick={wallet}>Wallet</Menu.Item>
                <Menu.Item key={6} onClick={personInfo}>Personal Info</Menu.Item>
                <Menu.Item key={7} onClick={createAuction}>Create Auction</Menu.Item>
                <Menu.Item key={8} onClick={uploadProperty}>Upload Property</Menu.Item>
            </Menu>
        </div>
    );
}