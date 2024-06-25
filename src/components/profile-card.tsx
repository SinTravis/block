import axios from 'axios';
import { Button, Col, Form, Input, Row } from 'antd';
import { useState, useEffect } from 'react';
import { validateEmail, validateTel } from '../utils/validater';
import profileClass from '../config';
import { Profile } from '../types';

const { TextArea } = Input;

export default function Card({ profile, getUser }: { profile: Profile; getUser: () => void }) {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    form?.setFieldsValue(profile);
  }, [profile, form]);

  const onSave = async () => {
    const values = form?.getFieldsValue();
    try {
      await axios.put('/api/update', values);
      getUser();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl mb-[40px]">
      <div className="md:flex relative">
        <div className="md:shrink-0">
          <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://iili.io/d2bqPj4.jpg" alt="Avatar" />
        </div>
        <div className="p-8">
          <div
            id="detail"
            className={`transition duration-500 ${isEditing ? 'absolute translate-y-[-120%] opacity-0' : ''}`}>
            <div className={profileClass}>{profile?.username}</div>
            <div className={profileClass}>{profile?.email}</div>
            <div className={profileClass}>{profile?.tel}</div>
            <p className="mt-2 text-slate-500">{profile?.something}</p>
            <Button className="mt-[15px]" type="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </div>
          <Form
            form={form}
            onFinish={onSave}
            className={`transition duration-500 ${isEditing ? '' : 'absolute translate-y-full delay-300'}`}>
            <Form.Item name="_id" hidden>
              <Input />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="tel"
                  label="Tel"
                  rules={[
                    {
                      validator: validateTel,
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      validator: validateEmail,
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="something" label="Something">
                  <TextArea />
                </Form.Item>
              </Col>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button className="ml-[15px]" type="primary" htmlType="submit">
                Save
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}
