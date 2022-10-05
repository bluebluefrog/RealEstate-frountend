import styles from "./AuctionHistoryPage.module.css";
import { Header, Footer} from "../../components";
import { useParams, useLocation } from "react-router-dom";
import {Spin} from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {AuctionHistory} from "../../components/auctionHistory";
import React, {useEffect} from "react";
import {getAuctionHistory} from "../../redux/auctionHistory/slice";

export const AuctionHistoryPage: React.FC = () => {
  
  const loading = useSelector((state) => state.auctionHistory.loading);
  const error = useSelector((state) => state.auctionHistory.error);

  const dispatch = useDispatch();
  const location = useLocation();

    useEffect(()=>{
        dispatch(getAuctionHistory());
    },[location])

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
        <div className={styles["product-list-container"]}>
            <AuctionHistory/>
        </div>
      </div>
      <Footer />
    </>
  );
};
