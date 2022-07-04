import React, { useCallback, useEffect, useState } from "react";
import { Table, Badge, Button, Modal, Form, Input, Switch } from "antd";
import CustomButton from "antd-button-color";
import { useProfessionalType } from "../../hooks";

const ProfessionalTypes = () => {
  const {
    professionalTypes,
    loading,

    listProfessionalTypes,
    newProfessionalType,
  } = useProfessionalType();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [modalText, setModalText] = useState(
    "Provide some informations to be sent"
  );
  const [form] = Form.useForm();

  useEffect(() => {
    listProfessionalTypes();
  }, [listProfessionalTypes]);

  const handleOk = useCallback(() => {
    (async () => {
      try {
        await form.validateFields();
        setModalText("Sending data to server");
        setConfirmLoading(true);
        newProfessionalType(form.getFieldsValue());
        handleCancel();
      } catch (error) {
        console.error(error);
      } finally {
        setModalText("Provide some informations to be sent");
        setConfirmLoading(false);
      }
    })();
  }, [newProfessionalType]);

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const professionalTypeColumns = [
    {
      title: "Situation",
      dataIndex: "situation",
      key: "situation",
      render: (situation) => (
        <Badge
          status={situation ? "success" : "default"}
          text={situation ? "Active" : "Inactive"}
        />
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter:
        /**
         * @type {function(boolean, {situation: boolean})}
         */
        (value, { situation }) => situation === value,
      sorter:
        /**
         * @type {function({situation: boolean}, {situation: boolean})}
         */
        (a, b) => a.situation - b.situation,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      filters: professionalTypes.map(({ description: value }) => ({
        text: value,
        value,
      })),
      onFilter:
        /**
         * @type {function(string, {description: string})}
         */
        (value, { description }) => description.indexOf(value) === 0,
      sorter:
        /**
         * @type {function({description:string}, {description:string})}
         */
        (a, b) =>
          a.description.localeCompare(b.description, "br", {
            ignorePunctuation: true,
            sensitivity: "base",
          }),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={showModal}
      >
        Add a new professional type
      </Button>
      <Modal
        title="New professional type"
        visible={visible}
        okText="Send"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
        >
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Situation"
            name="situation"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch
              defaultChecked={true}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              dir: "RTL",
            }}
          >
            <CustomButton
              ghost
              type="warning"
              onClick={() => form.resetFields()}
            >
              Reset
            </CustomButton>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={professionalTypes?.map((professionalType) => ({
          key: professionalType.id,
          ...professionalType,
        }))}
        loading={loading}
        columns={professionalTypeColumns}
        pagination={{
          pageSizeOptions: ((size) =>
            [5, 10, 25, 50, 100, 200].filter((v) => v <= size))(
            professionalTypes.length
          ),
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
      />
    </>
  );
};

export { ProfessionalTypes };
