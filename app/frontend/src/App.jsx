import { useState } from "react";
import { Refine } from "@refinedev/core";
import {
  notificationProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
} from "@refinedev/antd";
import { ConfigProvider, App as AntApp, theme } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { dataProvider } from "./dataProvider.js";
import { AdminsList } from "./resources/admins/list.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export default function Root() {
  const [dark, setDark] = useState(false);

  return (
    <ConfigProvider theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <AntApp>
        <BrowserRouter>
          <Refine
            dataProvider={dataProvider(API_BASE)}
            notificationProvider={notificationProvider}
            options={{ syncWithLocation: true }}
            resources={[
              { name: "admins", list: "/admins" },
              { name: "agents", list: "/agents" },
              { name: "numbers", list: "/numbers" },
              { name: "settings", list: "/settings" },
            ]}
          >
            <ThemedLayoutV2 Sider={() => <ThemedSiderV2 fixed /> }>
              <Routes>
                <Route path="/" element={<Navigate to="/admins" replace />} />
                <Route path="/admins" element={<AdminsList />} />
                <Route path="/agents" element={<div style={{padding:16}}>Agents</div>} />
                <Route path="/numbers" element={<div style={{padding:16}}>Numbers</div>} />
                <Route path="/settings" element={<div style={{padding:16}}>Settings</div>} />
              </Routes>
            </ThemedLayoutV2>

            <button
              className="ant-btn"
              style={{ position: "fixed", right: 16, bottom: 16, zIndex: 1000 }}
              onClick={() => setDark(!dark)}
            >
              {dark ? "Light" : "Dark"}
            </button>
          </Refine>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}
