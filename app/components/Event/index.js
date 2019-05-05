import React from 'react';
import classNames from 'classnames';

import stringToMaterialColor from '../../utils/stringToMaterialColor';

import styles from './styles.css';

const Event = ({ label, className }) => (
  <div className={classNames(styles.event, className)} style={stringToMaterialColor(label).style}>
    {label}
  </div>
)

export default Event;
