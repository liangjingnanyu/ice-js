import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Department {
  id: number;
  name: string;
  manager: string;
  description: string;
}

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const columns: ColumnsType<Department> = [
    { title: '部门名称', dataIndex: 'name', key: 'name' },
    { title: '部门主管', dataIndex: 'manager', key: 'manager' },
    { title: '部门描述', dataIndex: 'description', key: 'description' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Department) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setDepartments(departments.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingId === null) {
        const newDepartment = {
          ...values,
          id: Date.now(),
        };
        setDepartments([...departments, newDepartment]);
        message.success('添加成功');
      } else {
        setDepartments(
          departments.map(item =>
            item.id === editingId ? { ...item, ...values } : item
          )
        );
        message.success('更新成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          添加部门
        </Button>
      </div>
      <Table columns={columns} dataSource={departments} rowKey="id" />
      <Modal
        title={editingId === null ? '添加部门' : '编辑部门'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="manager"
            label="部门主管"
            rules={[{ required: true, message: '请输入部门主管' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="部门描述"
            rules={[{ required: true, message: '请输入部门描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentList;