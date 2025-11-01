import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

export const AdminsList = () => {
  const { tableProps } = useTable({ resource: "admins" });
  return (
    <List title="Admins">
      <Table rowKey="id" {...tableProps}>
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="role" title="Role" />
        <Table.Column dataIndex="isActive" title="Active" />
      </Table>
    </List>
  );
};
