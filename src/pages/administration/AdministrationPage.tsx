import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import CustomizedFiltersTab from "../../lib/AdministrationTabs/CustomizedFiltersTab/CustomizedFiltersTab";
import HistoryTab from "../../lib/AdministrationTabs/HistoryTab/HistoryTab";
import LogoutTab from "../../lib/AdministrationTabs/LogoutTab/LogoutTab";
import PasswordTab from "../../lib/AdministrationTabs/PasswordTab/PasswordTabs";
import ProfileTab from "../../lib/AdministrationTabs/ProfileTab/ProfileTab";
import UserManagementTab from "../../lib/AdministrationTabs/UserManagementTab/UserManagementTab";
import FooterBar from "../../lib/FooterBar/FooterBar";
import HeaderBar from "../../lib/HeaderBar/HeaderBar";
import styles from "./AdministrationPage.module.css";

const AdministrationMainTabContainer = () => {
  const [value, setValue] = React.useState("profile");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  function TabPanel(props: any) {
    const { children, value, index } = props;
    return <div>{value === index && <h1>{children}</h1>}</div>;
  }

  return (
    <div>
      <Box
        pb={0.25}
        sx={{
          mt: 15,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "1530px",
            minWidth: "1530px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            pt: 1,
          }}
        >
          <div>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Profile" value="profile" />
              <Tab label="Password" value="password" />
              <Tab label="User management" value="usermgmt" />
              <Tab label="Customized filters" value="customfilter" />
              <Tab label="History" value="history" />
              <Tab label="Log out" value="logout" />
            </Tabs>
          </div>
        </Paper>
      </Box>
      <Box sx={{ mt: 0.5, display: "flex", justifyContent: "center" }}>
        <Paper elevation={0} sx={{ width: "1530px", minWidth: "1530px" }}>
          <TabPanel value={value} index={"profile"}>
            <ProfileTab />
          </TabPanel>
          <TabPanel value={value} index={"password"}>
            <PasswordTab />
          </TabPanel>
          <TabPanel value={value} index={"usermgmt"}>
            <UserManagementTab />
          </TabPanel>
          <TabPanel value={value} index={"customfilter"}>
            <CustomizedFiltersTab />
          </TabPanel>
          <TabPanel value={value} index={"history"}>
            <HistoryTab />
          </TabPanel>
          <TabPanel value={value} index={"logout"}>
            <LogoutTab />
          </TabPanel>
        </Paper>
        <div className={styles.clearDiv}></div>
      </Box>
    </div>
  );
};

const AdministrationPage = () => {
  return (
    <>
      <HeaderBar />
      <AdministrationMainTabContainer />
      <FooterBar />
    </>
  );
};

export default AdministrationPage;
