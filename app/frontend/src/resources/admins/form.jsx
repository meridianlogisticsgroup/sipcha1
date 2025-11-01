import { Form, Input, Select, Switch } from "antd";

export const AdminForm = ({ form, initialValues = {} }) => {
  return (
    <Form form={form} layout="vertical" initialValues={{ isActive: true, role: "admin", ...initialValues }}>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input placeholder="admin@example.com" />
      </Form.Item>
      <Form.Item label="Role" name="role" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "super_admin", label: "Super Admin" },
            { value: "admin", label: "Admin" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Active" name="isActive" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="ID (optional)" name="id" tooltip="Defaults to email if omitted">
        <Input placeholder="unique-key" />
      </Form.Item>
    </Form>
  );
};
