import styles from "./UploadPropertyPage.module.css";
import {Header, Footer} from "../../components";
import {UploadProperty} from "../../components/uploadProperty";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {searchNoAuctionProduct} from "../../redux/auction/slice";

export const UploadPropertyPage: React.FC = () => {

    const location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => {dispatch(searchNoAuctionProduct())}, [location]);

    return (
        <>
            <Header/>
            <div className={styles["page-content"]}>
                <UploadProperty />
            </div>
            <Footer/>
        </>
    );
};
