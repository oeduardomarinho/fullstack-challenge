import React, { useCallback, useEffect, useState } from "react";
import { Table, Badge, Button, Modal, Form, Input, Select, Switch } from "antd";
import CustomButton from "antd-button-color";
import {
  AsYouType,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

import { useProfessional, useProfessionalType } from "../../hooks";

const Professionals = () => {
  const { professionals, loading, listProfessionals, newProfessional } =
    useProfessional();
  const { professionalTypes, listProfessionalTypes } = useProfessionalType();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [country, setCountry] = useState("BR");

  const [modalText, setModalText] = useState(
    "Provide some informations to be sent"
  );
  const [form] = Form.useForm();

  const refreshProfessionalTypes = useCallback(() => {
    listProfessionalTypes();
  }, [listProfessionalTypes]);

  useEffect(() => {
    refreshProfessionalTypes();
  }, []);

  useEffect(() => {
    listProfessionals();
  }, [listProfessionals]);

  const clearNonDigitsPhoneNumberFromForm = () => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      phoneNumber: String(form.getFieldValue("phoneNumber")).replace(/\D/g, ""),
    });
  };

  const handleOk = useCallback(() => {
    (async () => {
      try {
        await form.validateFields();
        clearNonDigitsPhoneNumberFromForm();
        setModalText("Sending data to server");
        setConfirmLoading(true);
        newProfessional(form.getFieldsValue());
        handleCancel();
      } catch (error) {
        console.error(error);
      } finally {
        setModalText("Provide some informations to be sent");
        setConfirmLoading(false);
      }
    })();
  }, [newProfessional]);

  const showModal = () => setVisible(true);

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const professionalColumns = [
    {
      title: "Situation",
      dataIndex: "situation",
      key: "situation",
      ellipsis: true,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      filters: professionals.map(({ name: value }) => ({
        text: value,
        value,
      })),
      onFilter:
        /**
         * @type {function(string, {name: string})}
         */
        (value, { name }) => name.indexOf(value) === 0,
      sorter:
        /**
         * @type {function({name:string}, {name:string})}
         */
        (a, b) =>
          a.name.localeCompare(b.name, "br", {
            ignorePunctuation: true,
            sensitivity: "base",
          }),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
      render: (phone) =>
        phone ? parsePhoneNumber(phone, "BR").formatNational() : "-",
    },
    {
      title: "Email",
      dataIndex: "mailAddress",
      key: "mailAddress",
      ellipsis: true,
      render:
        /**
         * @type {function(string, {name:string})}
         */
        (mailAddress) => mailAddress?.toLowerCase(),
    },
    {
      title: "Type",
      dataIndex: ["type", "description"],
      key: "type",
      ellipsis: true,
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          marginBottom: 16,
        }}
      >
        Add a new professional
      </Button>
      <Modal
        title="New professional"
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
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                validator: (_, value) =>
                  !value || isValidPhoneNumber(value, country)
                    ? Promise.resolve()
                    : Promise.reject(new Error("Invalid phone number")),
              },
            ]}
            normalize={(value) =>
              new AsYouType(country).input(
                /^\(\d\d$/.test(value)
                  ? String(value).substring(0, 2)
                  : String(value)
              )
            }
          >
            <Input
              addonBefore={
                <Select defaultValue="BR" value={country} onChange={setCountry}>
                  {getCountries().map((country) => (
                    <Select.Option key={country} value={country}>
                      {`${country} +${getCountryCallingCode(country)}`}
                    </Select.Option>
                  ))}
                </Select>
              }
            />
          </Form.Item>
          <Form.Item
            label="Mail address"
            name="mailAddress"
            rules={[{ type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="professionalTypeId"
            rules={[{ required: true, message: "'type' is required" }]}
          >
            <Select onClick={refreshProfessionalTypes}>
              {professionalTypes?.map(({ id, description }) => (
                <Select.Option key={description} value={id}>
                  {description}
                </Select.Option>
              ))}
            </Select>
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
          <Form.Item wrapperCol={{ dir: "RTL" }}>
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
        dataSource={professionals?.map((professional) => ({
          key: professional.id,
          ...professional,
        }))}
        loading={loading}
        columns={professionalColumns}
        pagination={{
          pageSizeOptions: ((size) =>
            [5, 10, 25, 50, 100, 200].filter((v) => v <= size))(
            professionals.length
          ),
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
      />
    </>
  );
};

export { Professionals };
