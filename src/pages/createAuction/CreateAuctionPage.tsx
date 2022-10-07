import styles from "./CreateAuctionPage.module.css";
import React, { useEffect } from "react";
import {Header, Footer, AuctionForm} from "../../components";
import {useLocation } from "react-router-dom";
import {Spin} from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {Info} from "../../components/info";
import {getPersonalInfo} from "../../redux/personalInfo/slice";
import {searchNoAuctionProduct} from "../../redux/auction/slice";

interface MatchParams {
  keywords: string;
}

export const CreateAuctionPage: React.FC = () => {
  
  const loading = useSelector((state) => state.productNoAuction.loading);
  const error = useSelector((state) => state.productNoAuction.error);
  const realEstatesNoAuction = useSelector((state) => state.productNoAuction.data);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(()=>{
    dispatch(searchNoAuctionProduct())
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
         <AuctionForm data={realEstatesNoAuction} />
      </div>
      <Footer />
    </>
  );
};
