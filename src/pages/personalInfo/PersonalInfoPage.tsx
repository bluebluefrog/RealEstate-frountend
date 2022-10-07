import styles from "./PersonalInfoPage.module.css";
import React, { useEffect } from "react";
import { Header, Footer } from "../../components";
import {useLocation } from "react-router-dom";
import {Spin} from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {Info} from "../../components/info";
import {getPersonalInfo} from "../../redux/personalInfo/slice";

interface MatchParams {
  keywords: string;
}

export const PersonalInfoPage: React.FC = () => {
  
  const loading = useSelector((state) => state.personalInfo.loading);
  const error = useSelector((state) => state.personalInfo.error);
  const personalInfo = useSelector((state) => state.personalInfo.data);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(()=>{
    dispatch(getPersonalInfo())
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
          <Info {...personalInfo}/>
      </div>
      <Footer />
    </>
  );
};
