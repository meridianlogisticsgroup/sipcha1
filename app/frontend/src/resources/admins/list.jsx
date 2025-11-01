import { useState, useMemo } from "react";
import { List, useTable, RefreshButton, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Typography, Input, Button, Drawer, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCreate, useUpdate } from "@refinedev/core";
import { AdminForm } from "./form.jsx";

export const AdminsList = () => {
  const { tableProps, setFilters } = useTable({ resource: "admins", syncWithLocation: true });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const { mutate: create } = useCreate();
  const { mutate: update } = useUpdate();

  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      create({ resource: "admins", values }, {
        onSuccess: () => { message.success("Admin created"); setDrawerOpen(false); form.resetFields(); },
      });
    } catch {}
  };
  const onUpdate = async () => {
    try {
      const values = await form.validateFields();
      update({ resource: "admins", id: editing.id, values }, {
        onSuccess: () => { message.success("Admin updated"); setDrawerOpen(false); setEditing(null); form.resetFields(); },
      });
    } catch {}
  };

  const columns = useMemo(() => [
    { dataIndex: "email", title: "Email" },
    { dataIndex: "role", title: "Role" },
    { dataIndex: "isActive", title: "Active", render: (v) => (v ? "Yes" : "No") },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space>
          <EditButton size="small" onClick={() => { setEditing(record); form.setFieldsValue(record); setDrawerOpen(true); }} />
          <DeleteButton size="small" resource="admins" id={record.id} onSuccess={() => message.success("Admin deleted")} />
        </Space>
      ),
    },
  ], [form]);

  return (
    <List
      title={
        <Space size={12}>
          <Typography.Title level={4} style={{ margin: 0 }}>Admins</Typography.Title>
          <Input.Search
            placeholder="Search email/role"
            onSearch={(val) => setFilters([{ field: "q", operator: "contains", value: val }], "replace")}
            allowClear
            style={{ width: 280 }}
          />
        </Space>
      }
      headerButtons={
        <Space>
          <RefreshButton />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setDrawerOpen(true); }}>
            New Admin
          </Button>
        </Space>
      }
    >
      <Table rowKey="id" {...tableProps} pagination={{ pageSize: 10 }}>
        {columns.map((c) => <Table.Column key={c.title || c.dataIndex} {...c} />)}
      </Table>

      <Drawer
        title={editing ? "Edit Admin" : "Create Admin"}
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setEditing(null); }}
        width={480}
        extra={
          <Space>
            <Button onClick={() => { setDrawerOpen(false); setEditing(null); }}>Cancel</Button>
            <Button type="primary" onClick={editing ? onUpdate : onCreate}>{editing ? "Save" : "Create"}</Button>
          </Space>
        }
      >
        <AdminForm form={form} initialValues={editing || {}} />
      </Drawer>
    </List>
  );
};
