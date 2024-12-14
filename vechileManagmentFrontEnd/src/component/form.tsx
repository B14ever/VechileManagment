import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Select, Switch, DatePicker, Row, Col, message } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

type FormComponentProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  initialValue?: {
    model?: string;
    year?: number;
    vin?: string;
    registrationDate?: string;
    isActive?: boolean;
    mileage?: number;
    fuelType?: string;
    color?: string;
    price?: number;
    createdAt?: string;
    updatedAt?: string;
  };
  okText: string;
  mode: 'create' | 'view' | 'edit';
  onSubmit: (values: any) => void; 
};

const FormComponent: React.FC<FormComponentProps> = ({
  openModal,
  setOpenModal,
  initialValue,
  okText,
  mode,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValue) {
      const adjustedValues = {
        ...initialValue,
        registrationDate: initialValue.registrationDate
          ? dayjs(initialValue.registrationDate)
          : null,
      };
      form.setFieldsValue(adjustedValues);
    } else {
      form.resetFields();
    }
  }, [initialValue, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const dataToSubmit = mode === 'edit' ? { ...initialValue, ...values } : values;
      onSubmit(dataToSubmit); // Pass data based on mode
    } catch {
      message.error('Please fix the errors in the form.');
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const isViewMode = mode === 'view'; // Check if the mode is 'view'

  return (
    <Modal
      title={initialValue ? 'Edit Vehicle' : 'Add Vehicle'}
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      width={800} // Increase modal width
    >
      <Form form={form} layout="vertical">
        {/* Two columns layout for most of the form */}
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="model"
              label="Model"
              rules={[{ required: true, message: 'Please enter the model' }]}
            >
              <Input placeholder="Enter model" disabled={isViewMode} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: 'Please enter the year' }]}
            >
              <InputNumber placeholder="Enter year" style={{ width: '100%' }} disabled={isViewMode} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="vin"
              label="VIN"
              rules={[{ required: true, message: 'Please enter the VIN' }]}
            >
              <Input placeholder="Enter VIN" disabled={isViewMode} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="registrationDate" label="Registration Date">
              <DatePicker style={{ width: '100%' }} disabled={isViewMode} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="isActive"
              label="Active Status"
              valuePropName="checked"
            >
              <Switch disabled={isViewMode} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="mileage"
              label="Mileage"
              rules={[{ required: true, message: 'Please enter the mileage' }]}
            >
              <InputNumber placeholder="Enter mileage" style={{ width: '100%' }} disabled={isViewMode} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="fuelType"
              label="Fuel Type"
              rules={[{ required: true, message: 'Please select the fuel type' }]}
            >
              <Select placeholder="Select fuel type" disabled={isViewMode}>
                <Option value="Petrol">Petrol</Option>
                <Option value="Diesel">Diesel</Option>
                <Option value="Electric">Electric</Option>
                <Option value="Hybrid">Hybrid</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="color" label="Color">
              <Input placeholder="Enter color" disabled={isViewMode} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber
                placeholder="Enter price"
                style={{ width: '100%' }}
                formatter={(value) => `$ ${value}`}
                disabled={isViewMode}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {isViewMode && (
            <>
              <Col xs={24}>
                <Form.Item label="Created At">
                  <Input
                    value={dayjs(initialValue?.createdAt).format('YYYY-MM-DD')}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Updated At">
                  <Input
                    value={dayjs(initialValue?.updatedAt).format('YYYY-MM-DD')}
                    disabled
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default FormComponent;
