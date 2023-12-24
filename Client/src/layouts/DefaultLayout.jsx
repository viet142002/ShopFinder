import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "antd";

import Map from "../components/Map/Map.component";
import SideBar from "../components/Layouts/SideBar.component";

const { Content } = Layout;

const DefaultLayout = () => {
  const p = useSelector((state) => state.routing.current);
  return (
    <Layout>
      {/* <HeaderLayout /> */}
      <SideBar />
      <Content>
        <div className="relative">
          {p.lat !== 0 ? <Map /> : "loading"}
          <Outlet />
        </div>
      </Content>
      {/* <FooterLayout /> */}
    </Layout>
  );
};

export default DefaultLayout;
