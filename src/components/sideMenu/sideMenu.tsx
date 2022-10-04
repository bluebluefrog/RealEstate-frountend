import React from 'react';
import styles from './sideMenu.module.css';
import { sideMenuList } from './mockup';
import { Menu } from 'antd';
import { GifOutlined } from '@ant-design/icons';


export const SideMenu:React.FC = () => {
    return (
        <Menu mode='vertical' className={styles['side-menu']}>
            {sideMenuList.map((m, index) => (
                <Menu.SubMenu
                    key={`side-menu-${index}`}
                    title={<span><GifOutlined />{m.title}</span>}
                >
                </Menu.SubMenu>
            ))}
        </Menu>
    )
}
