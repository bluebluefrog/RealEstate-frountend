import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getWatchList} from "../../redux/watchList/slice";
import {useHistory, useLocation} from "react-router-dom";
import {Spin} from "antd";
import {Footer, Header, ProductList} from "../../components";
import styles from "./WatchListPage.module.css";

export const WatchListPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        dispatch(getWatchList({nextPage:1, pageSize: 10}))
    },[location])

    const onPageChange = (nextPage, pageSize) =>{
        dispatch(getWatchList({nextPage, pageSize}))
    }

  const loading = useSelector((state) => state.watchList.loading);
  const error = useSelector((state) => state.watchList.error);
  const pagination = useSelector((state) => state.watchList.pagination);
  const productList = useSelector((state) => state.watchList.data);
  console.log(3)
  console.log(productList)


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
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
