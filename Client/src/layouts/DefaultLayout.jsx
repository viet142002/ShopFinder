import { Outlet } from "react-router-dom";

import { Layout } from "antd";

// import HeaderLayout from "../components/Layouts/Header.component";
// import FooterLayout from "../components/Layouts/Footer.component";
import Map from "../components/Map/Map.component";
import SideBar from "../components/Layouts/SideBar.component";

const { Content } = Layout;

const DefaultLayout = () => {
  return (
    <Layout>
      {/* <HeaderLayout /> */}
      <SideBar />
      <Content>
        <div className="relative">
          <Map />
          <Outlet />
        </div>
      </Content>
      {/* <FooterLayout /> */}
    </Layout>
  );
};

export default DefaultLayout;
