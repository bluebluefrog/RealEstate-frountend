import styles from "./UploadPropertyPage.module.css";
import {Header, Footer} from "../../components";
import {UploadProperty} from "../../components/uploadProperty";

interface MatchParams {
  keywords: string;
}

export const UploadPropertyPage: React.FC = () => {

  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
            <UploadProperty/>
      </div>
      <Footer />
    </>
  );
};
