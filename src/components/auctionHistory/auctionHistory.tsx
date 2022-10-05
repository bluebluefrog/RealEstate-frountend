import styles from "./auctionHistory.module.css";
import React, {useState} from "react";
import {Descriptions, Timeline} from "antd";
import {useSelector} from "../../redux/hooks";




export const AuctionHistory: React.FC = () => {

    const auctionHistory = useSelector(state => state.auctionHistory.data);

    return (
        <div className={styles["intro-container"]}>
            {auctionHistory.map(auction=>(
                <>
                <Descriptions title={auction.auctionTitle}>
                    <Descriptions.Item label="auctionId">{auction.id}</Descriptions.Item>
                    <Descriptions.Item label="realEstateId">{auction.realEstateId}</Descriptions.Item>
                    <Descriptions.Item label="startingBid">{auction.startingBid}</Descriptions.Item>
                    <Descriptions.Item label="appraisedValue">{auction.appraisedValue}</Descriptions.Item>
                    <Descriptions.Item label="auctionAnnouncement">{auction.auctionAnnouncement}</Descriptions.Item>
                    <Descriptions.Item label="securityDeposit">{auction.securityDeposit}</Descriptions.Item>
                </Descriptions>
                    <div>bid record:</div>
                    <br/>
                <Timeline>
                {auction.auctionRecordList.map(auctionRecord => (
                    <>
                    <Timeline.Item>bid price:${auctionRecord.bidPrice}</Timeline.Item>
                    <Timeline.Item>bid time:{auctionRecord.bidTime}</Timeline.Item>
                    </>
                ))}
                </Timeline>
                </>
            ))
            }
        </div>
    );
};

