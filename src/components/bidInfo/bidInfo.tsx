import styles from "./bidInfo.module.css";
import React, {useState} from "react";
import {Button, Divider, Form, InputNumber, List, Table} from "antd";
import { ColumnsType } from "antd/es/table";
import {RiseOutlined} from "@ant-design/icons";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {countdownValueType} from "antd/es/statistic/utils";
import Countdown from "antd/es/statistic/Countdown";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import {port} from "../../AppConfig";
import {useHistory} from "react-router-dom";

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
                                                 auctionRecordList,
                                             }) => {


    const [size, setSize] = useState<SizeType>('large');
    const history = useHistory();

    const auctionEnd = new Date(auctionDuration)

    const deadline = Date.now() + (auctionEnd.getTime() - Date.now()); // Moment is also OK

    const onBidFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            let response = await axios.post(port + `auction/createAuctionRecord?auctionId=${id}&bidPrice=${values.bidPrice}`);

            if (response.data.status == 200) {
                history.push(`/auctionHistory`)
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("create fail！");
        }
    };

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
                    dataSource={auctionRecordList.slice(0, 7)}
                    renderItem={item =>
                        <List.Item>{"bid price:" + item.bidPrice + "$" + "bid time:" + item.bidTime}</List.Item>}
                />
            </div>

            <div className={styles["bid-info"]}>

                <Countdown title="Auction time left" value={deadline} format="HH:mm:ss:SSS"/>
                <Form onFinish={onBidFinish}>
                    <FormItem name="bidPrice">
                        <InputNumber prefix="$" style={{width: '70%'}}/>
                    </FormItem>
                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button type="primary" htmlType="submit" shape="round" icon={<RiseOutlined/>} size={size}>
                            Bid Now!
                        </Button>
                    </Form.Item>
                </Form>

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
