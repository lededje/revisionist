import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const Container = ({ children, className, ...props }) => (
  <div {...props} className={classNames(styles.container, className)}>
    {children}
  </div>
);

export default Container;
