import { Tab } from "@mui/material";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import NotificationObjectTable from "../../lib/NotificationObjectTable/NotificationObjectTable";
import { useAppDispatch } from "../../redux/hooks";
import styles from "./NotificationPage.module.css";

const NotificationPage = () => {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(checkPythonServer());
  // }, []);
  return (
    <div id="notification-page-main">
      <HeaderBar />
      <div className={styles.notificationTabContainer}>
        <Tab label="Notifications" sx={{ mt: 8.5 }} />
      </div>
      <NotificationObjectTable />
      <FooterBar />
    </div>
  );
};

export default NotificationPage;
