import React, {useEffect} from "react";
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
} from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import {getRecommendProducts} from "../../redux/recommendProducts/slice";
import { MainLayout } from "../../layouts/mainLayout";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

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

    return (
      <MainLayout>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
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
          products={propertyList.rows}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              expolre
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={propertyList.rows}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              populour
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={propertyList.rows}
        />
      </MainLayout>
    );

}