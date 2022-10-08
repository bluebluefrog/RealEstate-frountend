import React, {useState} from 'react';
import styles from './UploadProperty.module.css';
import 'moment/locale/zh-cn';
import {
    Form,
    Input,
    Button,
    InputNumber, Select, Menu, Upload, Modal,

} from 'antd';
import axios from "axios";
import {port} from "../../AppConfig";
import {useHistory} from "react-router-dom";
import {
    AreaChartOutlined,
    DeleteOutlined,
    FormOutlined,PlusOutlined,
} from "@ant-design/icons";
import {useSelector} from "../../redux/hooks";
import {RcFile,UploadProps} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

export const UploadProperty: React.FC = () => {

    const history = useHistory();

    const [mode, setMode] = useState<string>("create");
    const [propertySelect, setPropertySelect] = useState(false);
    const [propertyId, setPropertyId] = useState<any>("");


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const propertyNoAuction = useSelector(state => state.productNoAuction.data);

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
                alert("create success！");
                history.push("/uploadProperty");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("create fail！");
        }
    };

    const onDeleteFinish = async (values: any) => {
        try {
            let response = await axios.post(port + "property/deleteProperty?propertyId="+values.realEstateId);

            if (response.data.status == 200) {
                alert("delete success！");
                history.push("/uploadProperty");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("delete fail！");
        }
    };

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

    const handleCancel = () => setPreviewOpen(false);

    const handleRemove = async (file: UploadFile) => {
        try {
            let response = await axios.post(port + "property/removeImg?path="+file.response.data);

            if (response.data.status == 200) {
                history.push("/uploadProperty");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("remove fail！");
        }
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        window.open(file.response.data)
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div className={styles.content}>
            <div className={styles.menu}>
                <Menu mode="horizontal" defaultSelectedKeys={['create']}>
                    <Menu.Item key="create" icon={<FormOutlined/>} onClick={() => {
                        setMode("create")
                        setPropertySelect(false)
                    }}>
                        Create Property
                    </Menu.Item>
                    <Menu.Item key="upload" icon={<AreaChartOutlined/>} onClick={() => {
                        setMode("upload")
                        setPropertySelect(false)
                    }}>
                        Upload Property Photo
                    </Menu.Item>
                    <Menu.Item key="delete" icon={<DeleteOutlined/>} onClick={() => {
                        setMode("delete")
                        setPropertySelect(false)
                    }}>
                        Delete Property
                    </Menu.Item>
                </Menu>
            </div>

            {mode == "create" ?
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

                    <Form.Item wrapperCol={{offset: 4, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form> : <template></template>
            }

            {mode === "upload" ?
                <Form>
                    <Form.Item label="Property"
                               name="realEstateId">
                        <Select onSelect={(value) => {
                            setPropertySelect(true)
                            setPropertyId(value)
                        }}>
                            {propertyNoAuction.map((realEstate) => (
                                <Select.Option value={realEstate.id}>{realEstate.streetAddress}</Select.Option>)
                            )}
                        </Select>
                    </Form.Item>

                    {propertySelect ?
                        <Form.Item style={{paddingLeft: "70px"}}>
                            {/*<Upload*/}
                            {/*    name="files"*/}
                            {/*    listType="picture-card"*/}
                            {/*    className="avatar-uploader"*/}
                            {/*    showUploadList={false}*/}
                            {/*    action={port + "property/uploadPropertyPhoto?propertyId=" + propertyId}*/}
                            {/*    beforeUpload={beforeUpload}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    multiple*/}
                            {/*>*/}
                            {/*    {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}*/}
                            {/*</Upload>*/}

                            <Upload
                                name="files"
                                action={port + "property/uploadPropertyPhoto?propertyId=" + propertyId}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                onRemove={handleRemove}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }}/>
                            </Modal>
                        </Form.Item>
                        : <template></template>
                    }
                </Form> : <template></template>
            }

            {mode === "delete" ?
                <Form onFinish={onDeleteFinish}>
                    <Form.Item label="Property"
                               name="realEstateId">
                        <Select onSelect={() => setPropertySelect(true)}>
                            {propertyNoAuction.map((realEstate) => (
                                <Select.Option value={realEstate.id}>{realEstate.streetAddress}</Select.Option>)
                            )}
                        </Select>
                    </Form.Item>
                    {propertySelect ?
                        <Form.Item style={{textAlign: "center"}}>
                            <Button type="primary" htmlType="submit">
                                Delete
                            </Button>
                        </Form.Item>
                        : <template></template>
                    }
                </Form> : <template></template>
            }
        </div>
    );
};