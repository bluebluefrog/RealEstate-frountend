import styles from "./bidInfo.module.css";
import React, {useState} from "react";
import {Button, Divider, InputNumber, List, Select, Table} from "antd";
import { ColumnsType } from "antd/es/table";
import {RiseOutlined} from "@ant-design/icons";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {countdownValueType} from "antd/es/statistic/utils";
import Countdown from "antd/es/statistic/Countdown";

interface PropsType {
    id:string,
    auctionDate: string;
    auctionDuration: string;
    startingBid: string | number;
    highestAuctionRecordId: string;
    auctionTitle: string;
    auctionDetail: string;
    auctionAnnouncement: string | number;
    auctionSponsorId: string;
    securityDeposit: string;
    appraisedValue: string;
    auctionRecordList: any[];
}

const columns: ColumnsType<RowType> = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
        align: "left",
        width: 120,
    },
    {
        title: "description",
        dataIndex: "description",
        key: "description",
        align: "center",
    },
];

interface RowType {
    title: string;
    description: string | number | JSX.Element;
    key: number;
}

export const BidInfo: React.FC<PropsType> = ({
                                                 id,
                                                 auctionDate,
                                                 auctionDuration,
                                                 startingBid,
                                                 highestAuctionRecordId,
                                                 auctionTitle,
                                                 auctionDetail,
                                                 auctionAnnouncement,
                                                 auctionSponsorId,
                                                 securityDeposit,
                                                 appraisedValue,
                                                 auctionRecordList
                                             }) => {

    const [size, setSize] = useState<SizeType>('large');

    const auctionEnd=new Date(auctionDuration)
    console.log(auctionEnd.getTime()-Date.now())
    const deadline = Date.now() + (auctionEnd.getTime() - Date.now()); // Moment is also OK

    // Date.now()+auctionEnd.getDate()

    const onFinish = () => {
        console.log('auction finished!');
    };

    const onChange = (val: countdownValueType) => {
        if (4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    };


    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: "auctionDate",

            description: auctionDate,
        },
        {
            key: 1,
            title: "auctionDuration",
            description: {auctionDuration} ? auctionDuration : "no info",
        },
        {
            key: 2,
            title: "auctionTitle",
            description: auctionTitle ? auctionTitle : "no info",
        },
        {
            key: 3,
            title: "auctionAnnouncement",
            description: auctionAnnouncement ? auctionAnnouncement : "no info",
        },
        {
            key: 4,
            title: "startingBid",
            description: startingBid ? startingBid : "no info",
        },
        {
            key: 5,
            title: "securityDeposit",
            description: securityDeposit ? securityDeposit : "no info",
        },
        {
            key: 6,
            title: "appraisedValue",
            description: appraisedValue ? appraisedValue : "no info",
        },
    ];

    return (
        <div className={styles["intro-container"]}>
            <Divider orientation="left">bid history</Divider>

            <div className={styles["bid-history"]}>
            <List
                size="small"
                bordered
                dataSource={auctionRecordList.slice(0,7)}
                renderItem={item => <List.Item>{"bid price:"+item.bidPrice+"$"+"bid time:"+item.bidTime}</List.Item>}
            />
            </div>

            <div className={styles["bid-info"]}>

                <InputNumber prefix="$" style={{ width: '70%' }} />

                <div className={styles["bid-button"]}>
                    <Countdown title="Auction time left" value={deadline} format="HH:mm:ss:SSS" />
                    <Button type="primary" shape="round" icon={<RiseOutlined/>} size={size}>
                        Bid Now!
                    </Button>
                </div>

            <Table<RowType>
                columns={columns}
                dataSource={tableDataSource}
                size="small"
                bordered={false}
                pagination={false}
                showHeader={false}
            />
            </div>
        </div>
    );
};
