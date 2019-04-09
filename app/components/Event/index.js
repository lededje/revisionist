import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const Event = ({ label, className }) => (
  <div className={classNames(styles.event, className)}>
    {label}
  </div>
)

export default Event;
