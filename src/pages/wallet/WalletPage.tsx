import React, {useEffect} from "react";
import { MainLayout } from "../../layouts/mainLayout";
import {Row, Col, Spin} from "antd";
import { useDispatch } from "react-redux";
import {PaymentForm} from "../../components/paymentForm";
import {WalletList} from "./WalletList";
import {getWalletList} from "../../redux/wallet/slice";
import { useLocation } from "react-router-dom";
import {useSelector} from "../../redux/hooks";

export const WalletPage: React.FC = (props) => {

    const loading = useSelector((state) => state.wallet.loading);
    const error = useSelector((state) => state.wallet.error);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWalletList())
    }, [location]);

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
    <MainLayout>
      <Row>
        <Col span={12}>
        <PaymentForm/>
        </Col>
        <Col span={12}>
            <WalletList/>
        </Col>
      </Row>
    </MainLayout>
  );
};
