import React, { FC, useContext } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/authentication-context';
import dayjs from 'dayjs';

const { Option } = Select;

interface SignUpFormOutput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: dayjs.Dayjs;
  bio: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },

  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const SignUpForm: FC = () => {
  const [form] = Form.useForm<SignUpFormOutput>();
  const auth = useContext(AuthContext);

  const onFinish = async (values: SignUpFormOutput) => {
    const correctedValues = {
      ...values,
      birthday: values.birthday.format('YYYY-MM-DD')
    };
    let response: AxiosResponse<{ token: string }> | undefined;
    try {
      response = await axios.post(
        import.meta.env.AUTH_SERVICE_BACKEND_URL + '/signup',
        correctedValues
      );
      console.log(response?.data);
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message);
      }
    }
    if (response?.data) {
      auth.onLogin?.(response.data.token);
    }
  };


  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name='name'
        label='Name'
        tooltip='How you will identify yourself in the platform!'
        rules={[
          {
            required: true,
            message: 'Name cannot be empty!',
            whitespace: true
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'Email should be valid!'
          },
          {
            required: true,
            message: 'Please enter your E-mail!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='password'
        label='Password'
        rules={[
          {
            required: true,
            message: 'Please enter a password!'
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        label='Confirm Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='Birthday'
        name='birthday'
        rules={[{ required: true, message: 'Please enter your birthday' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name='bio'
        label='Bio'
        rules={[
          {
            required: true,
            message: 'Fill in bio to be showcased in your profile'
          }
        ]}
      >
        <Input.TextArea showCount maxLength={160} />
      </Form.Item>

      <Form.Item
        name='gender'
        label='Gender'
        rules={[
          {
            required: true,
            message: 'Please select a gender!'
          }
        ]}
      >
        <Select placeholder='select your gender'>
          <Option value='MALE'>Male</Option>
          <Option value='FEMALE'>Female</Option>
          <Option value='OTHER'>Other</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit' block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
