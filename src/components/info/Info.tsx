import React, {useState} from 'react';
import styles from './Info.module.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    Descriptions,
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    InputNumber,
} from 'antd';
import axios from "axios";
import {port} from "../../AppConfig";
import {useHistory} from "react-router-dom";

interface PropsType {
    id:string,
    firstName:string,
    lastName:string,
    phone:number,
    sex:number,
    birthday:string,
    email:string,
    address:string,
    age:number
    otherInfo:string,
    createdTime:string,
}

export const Info: React.FC<PropsType> = ({id,
                                              firstName,
                                              lastName,
                                              phone,
                                              sex,
                                              birthday,
                                              email,
                                              address,
                                              age,
                                              otherInfo,
                                              createdTime,
                                          }) => {

    const history = useHistory();

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            let response = await axios.post(port + "account/updatePersonInfo",{
                firstName:values.firstName,
                lastName:values.lastName,
                phone:values.phone,
                sex: values.sex == "male" ? 1 : 0,
                birthday:values.birthday,
                email:values.email,
                age:values.age,
                otherInfo:values.otherInfo,
                address:values.address
            });
            if (response.data.status == 200) {
                history.push("/personalInfo");
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert(error)
            alert("save fail！");
        }
    };

    const [editForm,setEditForm] = useState(false);

    const { TextArea } = Input;

    return (
        <div className={styles.content}>

            {editForm ?
                <>
                    <Button type="primary" onClick={() => setEditForm(false)}>Back</Button>
                    <Form
                        labelCol={{span: 4}}
                        wrapperCol={{span: 14}}
                        layout="horizontal"
                        onFinish={onFinish}
                    >
                        <Form.Item label="firstName"
                                   name="firstName"
                                   >
                            <Input required defaultValue={firstName}/>
                        </Form.Item>

                        <Form.Item label="lastName"
                                   name="lastName">
                            <Input  required defaultValue={lastName}/>
                        </Form.Item>
                        <Form.Item label="phone"
                                   name="phone">
                            <Input required defaultValue={phone}/>
                        </Form.Item>

                        <Form.Item label="email"
                                   name="email">
                            <Input required defaultValue={email}/>
                        </Form.Item>

                        <Form.Item label="address"
                                   name="address">
                            <Input required defaultValue={address}/>
                        </Form.Item>

                        <Form.Item label="birthday"
                                   name="birthday">
                            <DatePicker defaultValue={moment(birthday, 'YYYY-MM-DD')}/>
                        </Form.Item>

                        <Form.Item label="age"
                                   name="age">
                            <InputNumber required defaultValue={age}/>
                        </Form.Item>
                        <Form.Item label="sex"
                                   name="sex">
                            <Radio.Group defaultValue={sex == 1 ? "male" : "female"}
                                         name="sex">
                                <Radio value="male"> male </Radio>
                                <Radio value="female"> female </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="otherInfo"
                                   name="otherInfo">
                            <TextArea rows={4} required defaultValue={otherInfo}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </>
                :
                <Descriptions title="User" layout="vertical" bordered
                              extra={<Button type="primary" onClick={() => setEditForm(true)}>Edit</Button>}>
                    <Descriptions.Item label="id">{id}</Descriptions.Item>
                    <Descriptions.Item label="firstName">{firstName}</Descriptions.Item>
                    <Descriptions.Item label="lastName">{lastName}</Descriptions.Item>
                    <Descriptions.Item label="phone">{phone}</Descriptions.Item>
                    <Descriptions.Item label="sex">{sex == 1 ? "male" : "female"}</Descriptions.Item>
                    <Descriptions.Item label="birthday">{birthday}</Descriptions.Item>
                    <Descriptions.Item label="email">{email}</Descriptions.Item>
                    <Descriptions.Item label="address">{address}</Descriptions.Item>
                    <Descriptions.Item label="age">{age}</Descriptions.Item>
                    <Descriptions.Item label="otherInfo">{otherInfo}</Descriptions.Item>
                    <Descriptions.Item label="createdTime">{createdTime}</Descriptions.Item>
                </Descriptions>
            }
        </div>
    );
};