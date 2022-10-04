import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import axios from "axios";
import {Spin, Row, Col, Divider, Typography, Anchor, Menu, Image} from "antd";
import styles from "./DetailPage.module.css";
import {
  Header,
  Footer,
  ProductIntro,
  ProductComments,
} from "../../components";
import { DatePicker, Space } from "antd";
import {propertyDetailSlice,getPropertyDetail } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {BidInfo} from "../../components/bidInfo";

const { RangePicker } = DatePicker;

interface MatchParams {
  propertyId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { propertyId } = useParams<MatchParams>();

  const loading = useSelector((state) => state.propertyDetail.loading);
  const error = useSelector((state) => state.propertyDetail.error);
  const property = useSelector((state) => state.propertyDetail.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyDetail(propertyId))
  }, []);
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
    return <div>网站出错：{error}</div>;
  }
  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
        {/* 产品简介 与 日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={property.realEstateVO.title}
                streetAddress={property.realEstateVO.streetAddress}
                suburb={property.realEstateVO.suburb}
                bedrooms={property.realEstateVO.bedrooms}
                bathrooms={property.realEstateVO.bathrooms}
                realEstateArea={property.realEstateVO.realEstateArea}
                landArea={property.realEstateVO.landArea}
                pictures={property.realEstateVO.realEstateImgs.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <BidInfo
                  id={property.auctionInfoVO.id}
                  auctionDate={property.auctionInfoVO.auctionDate}
                  auctionDuration={property.auctionInfoVO.auctionDuration}
                  startingBid={property.auctionInfoVO.startingBid}
                  highestAuctionRecordId={property.auctionInfoVO.highestAuctionRecordId}
                  auctionTitle={property.auctionInfoVO.auctionTitle}
                  auctionDetail={property.auctionInfoVO.auctionDetail}
                  auctionAnnouncement={property.auctionInfoVO.auctionAnnouncement}
                  auctionSponsorId={property.auctionInfoVO.auctionSponsorId}
                  securityDeposit={property.auctionInfoVO.securityDeposit}
                  appraisedValue={property.auctionInfoVO.appraisedValue}
                  auctionRecordList={property.auctionInfoVO.auctionRecordList}/>
            </Col>
          </Row>
        </div>
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="Auction Info"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#fees" title="Bid Now"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#notes" title="Property Detail"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Anchor.Link href="#comments" title="Property Photo"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>Property Detail</Typography.Title>
          </Divider>
          <div
            style={{ margin: 50 }}
          >

            <h1>title:{property.realEstateVO.title}</h1>
            <h1>streetAddress:{property.realEstateVO.streetAddress}</h1>
            <h1>suburb:{property.realEstateVO.suburb}</h1>
            <h1>bedrooms:{property.realEstateVO.bedrooms}</h1>
            <h1>bathrooms:{property.realEstateVO.bathrooms}</h1>
            <h1>realEstateArea:{property.realEstateVO.realEstateArea}</h1>
            <h1>landArea:{property.realEstateVO.landArea}</h1>
          </div>
        </div>
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>Property Photo</Typography.Title>
          </Divider>
          <div
            style={{ margin: 50 }}
          >
            {property.realEstateVO.realEstateImgs.map(p => (
                <Image src={p.url} height={1000} width={1000} />
              ))}
          </div>
        </div>

        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>Auction Detail</Typography.Title>
          </Divider>
          <div
            style={{ margin: 50 }}>
            <h1>{property.auctionInfoVO.auctionDetail}</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
