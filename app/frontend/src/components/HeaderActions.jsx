import { Space, Segmented, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const HeaderActions = ({ dark, setDark }) => {
  return (
    <Space align="center">
      <Tooltip title="Theme">
        <Segmented
          value={dark ? "Dark" : "Light"}
          onChange={(val) => setDark(val === "Dark")}
          options={[
            { label: "Light", value: "Light" },
            { label: "Dark", value: "Dark" },
          ]}
        />
      </Tooltip>
      <Avatar size="small" icon={<UserOutlined />} />
    </Space>
  );
};
