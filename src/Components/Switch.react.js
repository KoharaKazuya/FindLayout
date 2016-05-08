import React from 'react';
import styles from '../styles/switch.css';

/**
 * ON/OFF を切り替えられるパーツ
 */
const Switch = props => (
  <div
    className={props.active ? styles.on : styles.off}
    onClick={props.onToggle}
  >
    <span className={styles.bar} />
    <span className={styles.circle} />
  </div>
);

Switch.propTypes = {
  active: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
};

Switch.defaultProps = {
  active: false,
  onToggle: () => {},
};

export default Switch;
