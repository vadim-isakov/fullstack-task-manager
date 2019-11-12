import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

function FormItem({ item, msg, children, label, style }) {
  return (
    <Form.Item
      label={label}
      style={style}
      validateStatus={item && 'error'}
      help={item && msg}
    >
      {children}
    </Form.Item>
  );
}

FormItem.propTypes = {
  item: PropTypes.object,
  msg: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  style: PropTypes.object,
};

export default FormItem;
