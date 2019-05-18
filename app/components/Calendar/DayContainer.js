import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import useRect from '../useRect';

import styles from './styles.css';

import shallowCompare from '../../utils/shallowObjectCompare';

import rectType from '../../types/rect';

import { setRect } from '../../actions/calendar';

const DayContainer = ({ children, calendarRect, actions }) => {
  const calendarRef = useRef(null);
  const rect = useRect(calendarRef);

  /* Two reasons for this object. First it'rect returns a DOMObject which uses
  getters rather than values which causes problems. Second we need to offset the
  amount of padding left this component has. */
  const normalizedRect = {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left + 10,
    height: rect.height,
    width: rect.width - 10,
  };

  if (!shallowCompare(calendarRect, normalizedRect)) {
    actions.setRect({ rect: normalizedRect });
  }

  return (
    <div className={styles['day-container']} ref={calendarRef}>
      {children}
    </div>
  );
};

DayContainer.propTypes = {
  children: PropTypes.node.isRequired,
  calendarRect: PropTypes.shape(rectType).isRequired,
};

export default connect(
  state => ({
    calendarRect: state.calendar.rect,
  }),
  dispatch => ({
    actions: bindActionCreators({ setRect }, dispatch),
  }),
)(DayContainer);
