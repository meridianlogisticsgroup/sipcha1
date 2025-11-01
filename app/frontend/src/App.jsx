import { useState } from "react";
import { Refine } from "@refinedev/core";
import { notificationProvider, ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/antd";
import { ConfigProvider, App as AntApp, theme } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { dataProvider } from "./dataProvider/index.js";
import { AdminsList } from "./resources/admins/list.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { HeaderActions } from "./components/HeaderActions.jsx";
import { TeamOutlined, PhoneOutlined, SettingOutlined, DashboardOutlined, CrownOutlined } from "@ant-design/icons";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export default function Root() {
  const [dark, setDark] = useState(false);
  return (
   
 <ConfigProvider
   theme={{
     algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
     token: { borderRadius: 10, controlHeight: 36, fontSize: 14 },
   }}
 >
      <AntApp>
        <BrowserRouter>
          <Refine
            dataProvider={dataProvider(API_BASE)}
            notificationProvider={notificationProvider}
            options={{ syncWithLocation: true }}
            resources={[
              { name: "dashboard", list: "/dashboard", meta: { icon: <DashboardOutlined /> } },
              { name: "admins", list: "/admins", meta: { icon: <CrownOutlined /> } },
              { name: "agents", list: "/agents", meta: { icon: <TeamOutlined /> } },
              { name: "numbers", list: "/numbers", meta: { icon: <PhoneOutlined /> } },
              { name: "settings", list: "/settings", meta: { icon: <SettingOutlined /> } },
            ]}
          >
            <ThemedLayoutV2
              Title={({ collapsed }) => <ThemedTitleV2 text="SIPCHA Admin" collapsed={collapsed} />}
              Header={() => <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 16, height: "64px" }}><HeaderActions dark={dark} setDark={setDark} /></div>}
              Sider={() => <ThemedSiderV2 fixed />}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admins" element={<AdminsList />} />
                <Route path="/agents" element={<div style={{padding:16}}>Agents</div>} />
                <Route path="/numbers" element={<div style={{padding:16}}>Numbers</div>} />
                <Route path="/settings" element={<div style={{padding:16}}>Settings</div>} />
              </Routes>
            </ThemedLayoutV2>
          </Refine>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}
