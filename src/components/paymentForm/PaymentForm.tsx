import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {Button, Checkbox, Form, Input} from "antd";
import styles from "./PaymentForm.module.css";
import {useDispatch} from "react-redux";
import axios from "axios";
import {port} from "../../AppConfig";
import {useHistory} from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const onFinish = async (values: any) => {
  console.log("Success:", values);
  try {
    console.log(values.number)
    let response = await axios.post(port + `wallet/addWallet?bankAccount=${values.cardNumber}`);
    if (response.data.status == 200) {
      window.location.reload()
    } else {
      alert(response.data.msg);
    }
  } catch (error) {
    alert("add wallet fail！");
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export class PaymentForm extends React.Component {

  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
        <div  id="PaymentForm" style={{marginTop: 50}}>
        <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
        />
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Form.Item style={{marginLeft:"110px",marginTop:"20px",width:"400px" }}
                     name="cardNumber"
                     rules={[{ required: true, message: "Please input your CardNumber!" }]}>
            <Input
                type="tel"
                name="number"
                placeholder="Card Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}/>
          </Form.Item>
          <Form.Item style={{marginLeft:"260px",marginTop:"10px"}}>
            <Button type="primary" htmlType="submit">
              Add Card
            </Button>
          </Form.Item>
        </Form>
        </div>
    );
  }
}
