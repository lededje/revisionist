import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import className from 'classnames';

import styles from './styles.css';

import DragTypes from '../../consts/DragTypes';

const source = {
  beginDrag: props => props,
};

const collect = connect => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
});

const WrappedHandle = ({ resizeDirection, connectDragPreview, connectDragSource }) => {
  useEffect(() => {
    connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, [connectDragPreview]);

  const classes = className(styles.handle, styles[`handle--${resizeDirection}`]);
  return connectDragSource(<div className={classes} />);
};

WrappedHandle.propTypes = {
  resizeDirection: PropTypes.oneOf(['up', 'down']).isRequired,
};

export default DragSource(DragTypes.EVENT_HANDLE, source, collect)(WrappedHandle);
