import React, { useState } from 'react';
import { Breadcrumb, Button, Divider, Layout, Table, Tag, message, Modal, DatePicker, Select } from 'antd';
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import FormComponent from './component/form';
import useFetchData from './hooks/useFetchData';
import useCreate from './hooks/useCreate';
import useUpdate from './hooks/useUpdate';
import useDelete from './hooks/useDelete';
import dayjs from 'dayjs';

interface Vehicle {
  _id: string;
  model: string;
  year: number;
  vin: string;
  registrationDate: string;
  isActive: boolean;
  mileage: number;
  fuelType: string;
  color: string;
  price: number;
  createdAt: string;
  updatedAt: string; // Add updatedAt field
}

const Dashboard: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [initialValue, setInitialValue] = useState<Vehicle | undefined>();
  const [okText, setOkText] = useState('');
  const [openMode, setOpenMode] = useState<'create' | 'view' | 'edit'>('view');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const { data, loading, fetchData } = useFetchData<{
    data: Vehicle[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }>('/view');
  const { create} = useCreate<Vehicle>();
  const { update} = useUpdate<Vehicle>();
  const { deleteById, loading: deleteLoading } = useDelete(); 

  const [filters, setFilters] = useState({
    createdAt: null,
    updatedAt: null,
    fuelType: null,
  });

  const handleAdd = () => {
    setInitialValue(undefined);
    setOpenMode('create');
    setOpenModal(true);
    setOkText('Create');
  };

  const handleView = (record: Vehicle) => {
    setInitialValue(record);
    setOpenMode('view');
    setOpenModal(true);
    setOkText('Ok');
  };

  const handleEdit = (record: Vehicle) => {
    setInitialValue(record);
    setOpenMode('edit');
    setOpenModal(true);
    setOkText('Update');
  };

  const handleDelete = (record: Vehicle) => {
    setVehicleToDelete(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!vehicleToDelete) return;

    try {
      await deleteById(vehicleToDelete._id); 
      message.success('Vehicle deleted successfully!');
      await fetchData(); 
    } catch (error) {
      message.error('An error occurred while deleting the vehicle.');
    } finally {
      setDeleteModalVisible(false);
      setVehicleToDelete(null);
    }
  };

  const handleSubmit = async (values: Vehicle) => {
    try {
      if (openMode === 'create') {
        await create(values);
        message.success('Vehicle created successfully!');
      } else if (openMode === 'edit') {
        await update(values._id, values); 
        message.success('Vehicle updated successfully!');
      }

      setOpenModal(false);
      await fetchData();
    } catch (error) {
      message.error('An error occurred while saving the vehicle.');
    }
  };

  const handleFilterChange = (value: any, field: string) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const columns: ColumnType<Vehicle>[] = [
    {
      title: 'View',
      dataIndex: '_id',
      align: 'center',
      width: 75,
      render: (_, record): JSX.Element => (
        <InfoCircleOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => handleView(record)}
        />
      ),
    },
    {
      title: 'Edit',
      dataIndex: '_id',
      align: 'center',
      width: 75,
      render: (_, record): JSX.Element => (
        <EditOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string): string => {
        const date = new Date(text);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate()
        ).padStart(2, '0')}`;
      },
      filterDropdown: () => (
        <DatePicker
          style={{ margin: '8px' }}
          format="YYYY-MM-DD"
          onChange={(date, dateString) => handleFilterChange(dateString, 'createdAt')}
        />
      ),
      onFilter: (value, record) => record.createdAt.includes(value),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string): string => {
        const date = new Date(text);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate()
        ).padStart(2, '0')}`;
      },
      filterDropdown: () => (
        <DatePicker
          style={{ margin: '8px' }}
          format="YYYY-MM-DD"
          onChange={(date, dateString) => handleFilterChange(dateString, 'updatedAt')}
        />
      ),
      onFilter: (value, record) => record.updatedAt.includes(value),
    },
    {
      title: 'Fuel Type',
      dataIndex: 'fuelType',
      key: 'fuelType',
      filters: [
        { text: 'Petrol', value: 'Petrol' },
        { text: 'Diesel', value: 'Diesel' },
        { text: 'Electric', value: 'Electric' },
        // Add more fuel types if needed
      ],
      onFilter: (value, record) => record.fuelType.toLowerCase().includes(value.toLowerCase()),
    },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'VIN', dataIndex: 'vin', key: 'vin' },
    { title: 'Mileage', dataIndex: 'mileage', key: 'mileage' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text: boolean): JSX.Element =>
        text ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: 'Delete',
      dataIndex: '_id',
      align: 'center',
      width: 75,
      render: (_, record): JSX.Element => (
        <DeleteOutlined
          style={{ cursor: 'pointer', color: 'red' }}
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  return (
    <Layout.Content 
    style={{
      padding: '0 48px',
      background: '#fff',
      maxWidth: '1200px', 
      margin: '24px auto',
      width: '90%',
    }}>
      <Button
        type="primary"
        style={{ padding: '1em', marginTop: '10px' }}
        onClick={handleAdd}
      >
        Add
      </Button>
      <Divider />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Vehicle Management</Breadcrumb.Item>
        <Breadcrumb.Item>View</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={loading}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            total: data?.totalCount,
            current: data?.currentPage,
            pageSizeOptions: ['10', '20', '30'],
          }}
          scroll={{ x: 'max-content' }}
          filteredValue={filters} 
        />
      </div>
      <FormComponent
        openModal={openModal}
        setOpenModal={setOpenModal}
        initialValue={initialValue}
        okText={okText}
        mode={openMode}
        onSubmit={handleSubmit}
      />
      <Modal
        open={deleteModalVisible}
        title="Delete Vehicle"
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        confirmLoading={deleteLoading}
      >
        <p>Are you sure you want to delete this vehicle?</p>
      </Modal>
    </Layout.Content>
  );
};

export default Dashboard;
