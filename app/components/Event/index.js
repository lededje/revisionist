import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import durationToHumanReadable from '../../utils/durationToHumanReadable';
import stringToMaterialColor from '../../utils/stringToMaterialColor';

import styles from './styles.css';

const renderTime = (startTime, duration) => {
  if(!startTime && !duration) return null;

  let time = '';

  if(startTime) {
    time += `${moment(startTime).format('H:mm A')} `;
  }

  if(duration) {
    time += `(${durationToHumanReadable(duration)}) `;
  }

  return (
    <span className={styles.time}>
      {time.trim()}
    </span>
  )
}

const Event = ({ label, className, startTime, duration, style }) => (
  <div className={classNames(styles.event, className)} style={{...stringToMaterialColor(label).style, ...style}}>
    <span className={styles.label}>{`${label} `}</span>
    {renderTime(startTime, duration)}
  </div>
)

export default Event;
