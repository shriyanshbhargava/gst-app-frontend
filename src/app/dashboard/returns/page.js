'use client'

import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Col, Select, Form, Modal, Upload } from 'antd'
import React from 'react'

const { confirm } = Modal
const { Title } = Typography

const Returns = () => {
  const [form] = Form.useForm()
  const currYear = new Date().getFullYear() - 2

  const types = [
    { value: 'GSTR-1', label: 'GSTR-1' },
    { value: 'GSTR-3B' - 1, label: 'GSTR-3B' },
  ]

  const yearsList = Array.from({ length: 4 }, (_, index) => ({
    value: currYear + index,
    label: `${currYear + index}-${(currYear + index + 1).toString().slice(-2)}`,
  }))

  const submitHandler = (values) => {
    console.log(values)
  }

  return (
    <>
      <Row className="mb-3">
        <Title level={3}>Return Filings</Title>
      </Row>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={(values) =>
          confirm({
            icon: <ExclamationCircleOutlined />,
            title: 'Do you want to proceed?',
            content:
              'Please press Ok to continue or Cancel to confirm all the details before submitting.',
            onOk() {
              submitHandler(values)
            },
            onCancel() {},
          })
        }
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="GST Type"
              name="type"
              rules={[{ required: true, message: 'Please select a type!' }]}
            >
              <Select
                style={{
                  width: 150,
                }}
                options={types}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Time Period"
              name="month"
              rules={[
                { required: true, message: 'Please select a time period!' },
              ]}
            >
              <Select
                style={{
                  width: 150,
                }}
                options={yearsList}
              />
            </Form.Item>
          </Col>
          <Col className="mt-4" span={24}>
            <Form.Item
              label="Upload documents"
              name="files"
              rules={[{ required: true, message: 'Please upload a file!' }]}
            >
              <Upload
                maxCount={1}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                beforeUpload={() => false}
                progress={{
                  strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  },
                  strokeWidth: 3,
                  format: (percent) =>
                    percent && `${parseFloat(percent.toFixed(2))}%`,
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  )
}

export default Returns
