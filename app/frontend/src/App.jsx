import { useState, useMemo } from "react";
import { Refine } from "@refinedev/core";
import { notificationProvider, ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/antd";
import { ConfigProvider, App as AntApp, theme } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { dataProvider } from "./dataProvider.js";
import { AdminsList } from "./resources/admins/list.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { HeaderActions } from "./components/HeaderActions.jsx";
import { TeamOutlined, PhoneOutlined, SettingOutlined, DashboardOutlined, CrownOutlined } from "@ant-design/icons";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export default function Root() {
  const [dark, setDark] = useState(false);

  const themeConfig = useMemo(() => ({
    algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#6366F1", // indigo-500
      colorInfo: "#6366F1",
      colorLink: "#6366F1",
      borderRadius: 12,
      fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      controlHeight: 38,
    },
    components: {
      Layout: {
        headerBg: dark ? "#0f172a" : "#ffffff",
        siderBg: dark ? "#0b1220" : "#0f172a0d",
        headerHeight: 64,
      },
      Menu: {
        itemHeight: 44,
        itemBorderRadius: 10,
        itemMarginBlock: 6,
      },
      Card: { paddingLG: 20, borderRadiusLG: 16 },
      Button: { controlHeight: 38, borderRadius: 12 },
      Table: { borderRadius: 12 },
      Input: { controlHeight: 38, borderRadius: 10 },
      Select: { controlHeight: 38, borderRadius: 10 },
    },
  }), [dark]);

  return (
    <ConfigProvider theme={themeConfig}>
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
              Header={() => (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 16, height: 64 }}>
                  <HeaderActions dark={dark} setDark={setDark} />
                </div>
              )}
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
