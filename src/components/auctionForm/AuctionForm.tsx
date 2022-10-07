import React, {useState} from 'react';
import styles from './AuctionForm.module.css';
import 'moment/locale/zh-cn';
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber, Select,
} from 'antd';
import axios from "axios";
import {port} from "../../AppConfig";
import {useHistory} from "react-router-dom";

interface PropsType {
    data: {
        id: string,
        realEstateType:number,
        landArea:  string,
        realEstateArea: string,
        bedrooms: number,
        bathrooms: number,
        garage: number,
        streetAddress: string,
        suburb: string,
        agentId: string,
        onAuction: number,
        title: string,
        realEstateImgs: [
            {
                id:string,
                realEstateId: string,
                positionSort: number,
                isMain:number,
                createdTime: string,
                updatedTime: string,
                url: string
            }
        ]
    }[],
}

export const AuctionForm: React.FC<PropsType> = ({data}) => {

    const history = useHistory();

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            let response = await axios.post(port + "auction/createAuction",{
                auctionDate:values.auctionDate,
                auctionDuration:values.auctionDuration,
                startingBid:values.startingBid,
                auctionTitle:values.auctionTitle,
                auctionDetail:values.auctionDetail,
                auctionAnnouncement:values.auctionAnnouncement,
                realEstateId:values.realEstateId,
                securityDeposit:values.securityDeposit,
                appraisedValue:values.appraisedValue,
                markup:values.markup
            });
            if (response.data.status == 200) {
                history.push("/createAuction");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("create fail！");
        }
    };

    const [editForm,setEditForm] = useState(false);

    const { TextArea } = Input;

    return (
        <div className={styles.content}>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                onFinish={onFinish}
            >
                <Form.Item label="auctionDate"
                           name="auctionDate">
                    <DatePicker/>
                </Form.Item>

                <Form.Item label="auctionFinishDate"
                           name="auctionDuration">
                    <DatePicker/>
                </Form.Item>

                <Form.Item label="startingBid"
                           name="startingBid">
                    <InputNumber required/>
                </Form.Item>

                <Form.Item label="auctionTitle"
                           name="auctionTitle">
                    <Input required/>
                </Form.Item>

                <Form.Item label="auctionAnnouncement"
                           name="auctionAnnouncement" >
                    <Input required/>
                </Form.Item>

                <Form.Item label="Property"
                           name="realEstateId">
                    <Select>
                        {data.map((realEstate)=>(
                        <Select.Option value={realEstate.id}>{realEstate.streetAddress}</Select.Option>)
                        )}
                    </Select>
                </Form.Item>

                <Form.Item label="securityDeposit"
                           name="securityDeposit">
                    <InputNumber required/>
                </Form.Item>

                <Form.Item label="appraisedValue"
                           name="appraisedValue">
                    <InputNumber required/>
                </Form.Item>

                <Form.Item label="markup"
                           name="markup">
                    <InputNumber required/>
                </Form.Item>

                <Form.Item label="auctionDetail"
                           name="auctionDetail">
                    <TextArea rows={4} required/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 4, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};