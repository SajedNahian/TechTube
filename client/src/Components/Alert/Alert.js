import React from 'react';
import './Alert.scss';

export default function Alert({ message }) {
  return <div className="alert box-shadow">{message}</div>;
}
