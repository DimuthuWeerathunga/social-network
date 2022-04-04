import React from 'react';
import { useState } from 'react';
import { Form, Button, Upload, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

function normFile(e) {
  // console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UpdateThreadForm = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  }

  function handleChange({ fileList }) {
    return setFileList(fileList);
  }

  function handleCancel() {
    return setPreviewVisible(false);
  }

  function beforeUpload(file, fileList) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      return true;
    } else {
      console.log('You cant uploald files other than jpeg');
      console.log(fileList);
      return Upload.LIST_IGNORE;
    }
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form
        // TODO
        // Dynamically set the form name depending on whether we are creating
        // or editing a post
        name={`Dynamically set the form name here`}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          'input-number': 3,
          'checkbox-group': ['A', 'B'],
          rate: 3.5,
        }}
      >
        <Form.Item
          name='title'
          label='Title'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please enter the title of the thread!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='content'
          label='Content'
          rules={[
            {
              required: true,
              message: 'Please enter your post content!',
            },
          ]}
        >
          <Input.TextArea showCount autoSize={{ minRows: 3 }} />
        </Form.Item>

        <Form.Item
          name='images'
          label='Upload pictures'
          valuePropName='fileList'
          getValueFromEvent={normFile}
        >
          <Upload
            name='images'
            beforeUpload={beforeUpload}
            customRequest={({ onSuccess }) => {
              console.log('Custome request handled');
              onSuccess();
              // console.log(fileList);
            }}
            fileList={fileList}
            listType='picture-card'
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={10}
          >
            {fileList.length >= 10 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UpdateThreadForm;
