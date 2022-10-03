import React from 'react';
import styles from "./App.module.css";
import { Header, Footer, Carousel, SideMenu, ProductCollection} from "./components";
import { Row, Col, Typography } from 'antd';
import { productList1, productList2, productList3 } from "./mockups";

function App() {
    return (
        <div className={styles.App}>
            <Header />
            {/* 页面的内容 content */}
            <div className={styles['page-content']}>
                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>
                <ProductCollection
                    title={<Typography.Title level={3} type="warning">爆款推荐</Typography.Title>}
                    sideImage=""
                    products={productList1}
                />
                 <ProductCollection
                    title={<Typography.Title level={3} type="danger">新品上市</Typography.Title>}
                    sideImage=""
                    products={productList2}
                />
                <ProductCollection
                    title={<Typography.Title level={3} type="success">新品上市</Typography.Title>}
                    sideImage=""
                    products={productList3}
                />
            </div>
            <Footer />
        </div>
    );
}

export default App;
