import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import durationToHumanReadable from '../../utils/durationToHumanReadable';
import stringToMaterialColor from '../../utils/stringToMaterialColor';

import styles from './styles.css';

const Event = ({ label, className, startTime, duration }) => (
  <div className={classNames(styles.event, className)} style={stringToMaterialColor(label).style}>
    <span className={styles.label}>{`${label} `}</span>
    {startTime || duration ? <span className={styles.time}>{ moment(startTime).format('H:mm A') } ({durationToHumanReadable(duration)})</span> : null}
  </div>
)

export default Event;
