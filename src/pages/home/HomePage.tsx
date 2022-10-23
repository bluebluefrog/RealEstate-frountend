import React, {useEffect} from "react";
import {
  Carousel,
  SideMenu,
  ProductCollection,
} from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage from "../../assets/images/rea-logo-for-social.png";
import {getRecommendProducts} from "../../redux/recommendProducts/slice";
import { MainLayout } from "../../layouts/mainLayout";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {getWatchList} from "../../redux/watchList/slice";

interface MatchParams {
    keywords: string;
}

export const HomePage: React.FC = () => {

    const { keywords } = useParams<MatchParams>();

    const loading = useSelector((state) => state.recommendProducts.loading);
    const error = useSelector((state) => state.recommendProducts.error);
    const propertyList = useSelector((state) => state.recommendProducts.data);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(()=>{
        dispatch(getRecommendProducts({page: 1, pageSize: 10, keyWord:keywords}));
    },[location])

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        );
    }


    if (error) {
        return <div>web error：{error}</div>;
    }

    if (propertyList.rows.length < 10) {
        return <div>web data missing：{error}</div>;
    }

    return (
        <MainLayout>
            <Row style={{marginTop: 20}}>
                <Col span={6}>
                    <SideMenu/>
                </Col>
                <Col span={18}>
                    <Carousel />
                </Col>
            </Row>
            <ProductCollection
                title={
                    <Typography.Title level={3} type="warning">
                        new
                    </Typography.Title>
                }
                sideImage={sideImage}
                products={propertyList.rows.slice(0, 10)}
            />
            <ProductCollection
                title={
                    <Typography.Title level={3} type="danger">
                        popular
                    </Typography.Title>
                }
                sideImage={sideImage}
                products={propertyList.rows.length < 20 ? propertyList.rows.slice(0, 10) : propertyList.rows.slice(11, 21)}
            />
            <ProductCollection
                title={
                    <Typography.Title level={3} type="success">
                        explore
                    </Typography.Title>
                }
                sideImage={sideImage}
                products={propertyList.rows.length < 30 ? propertyList.rows.slice(0, 10) : propertyList.rows.slice(22, 32)}
            />
        </MainLayout>
    );

}
