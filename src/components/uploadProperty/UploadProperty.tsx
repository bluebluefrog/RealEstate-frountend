import React, {useState} from 'react';
import styles from './UploadProperty.module.css';
import 'moment/locale/zh-cn';
import {
    Form,
    Input,
    Button,
    InputNumber, Select, Upload, message,
} from 'antd';
import axios from "axios";
import {port} from "../../AppConfig";
import {useHistory} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
import {RcFile, UploadChangeParam, UploadProps} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

export const UploadProperty: React.FC = () => {

    const history = useHistory();

    const [imageUrls, setImageUrls] = useState<any[]>();

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            let response = await axios.post(port + "property/createProperty",{
                realEstateType:values.realEstateType,
                landArea:values.landArea,
                realEstateArea:values.realEstateArea,
                bedrooms:values.bedrooms,
                bathrooms:values.bathrooms,
                garage:values.garage,
                streetAddress:values.streetAddress,
                suburb:values.suburb,
                title:values.title
            });

            if (response.data.status == 200) {
            //     try{
            //         let formObj = new FormData()
            //         formObj.append("files",values.fileList)
            //
            //         let responseUpload = await axios.post(port + "property/uploadPropertyPhoto?propertyId=" + response.data.data.id,
            //
            //             {data:formObj},
            //
            //             {
            //                 headers:{
            //                     "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>"
            //                 }
            //             }
            //             );
            //         if (response.data.status == 200) {
            //             // history.push("/createAuction");
            //         } else {
            //             alert(response.data.msg);
            //         }
            //     }catch (error) {
            //         alert(error)
            //         alert("upload photo fail！");
            // }
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
                <Form.Item label="landArea"
                           name="landArea">
                    <Input required/>
                </Form.Item>

                <Form.Item label="realEstateArea"
                           name="realEstateArea">
                    <Input required/>
                </Form.Item>

                <Form.Item label="bedrooms"
                           name="bedrooms">
                    <InputNumber required/>
                </Form.Item>

                <Form.Item label="bathrooms"
                           name="bathrooms">
                    <InputNumber required/>
                </Form.Item>

                <Form.Item label="garage"
                           name="garage">
                    <InputNumber required/>
                </Form.Item>

                <Form.Item label="streetAddress"
                           name="streetAddress">
                    <Input required/>
                </Form.Item>
                <Form.Item label="suburb"
                           name="suburb">
                    <Input required/>
                </Form.Item>
                <Form.Item label="title"
                           name="title">
                    <Input required/>
                </Form.Item>

                <Form.Item label="Property"
                           name="realEstateType">
                    <Select>
                        <Select.Option value="1">House</Select.Option>
                        <Select.Option value="2">Apartment</Select.Option>
                        <Select.Option value="3">TownHouse</Select.Option>
                        <Select.Option value="4">Studio</Select.Option>
                        <Select.Option value="5">Duplex</Select.Option>
                        <Select.Option value="6">Villa</Select.Option>
                        <Select.Option value="7">Semihouse</Select.Option>
                        <Select.Option value="8">Flat</Select.Option>
                        <Select.Option value="9">Terrace</Select.Option>
                        <Select.Option value="10">Unit</Select.Option>
                    </Select>
                </Form.Item>

                {/*<Form.Item label="Upload" name="fileList">*/}
                {/*    <Upload listType="picture-card">*/}
                {/*        <div>*/}
                {/*            <PlusOutlined />*/}
                {/*            <div style={{ marginTop: 8 }}>Upload</div>*/}
                {/*        </div>*/}
                {/*    </Upload>*/}
                {/*</Form.Item>*/}

                <Form.Item wrapperCol={{offset: 4, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};