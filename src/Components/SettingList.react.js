import React from 'react';
import styles from '../styles/settinglist.css';

const SettingList = props => {
  let settingLegend = null;
  if (props.legend !== '') {
    settingLegend = (
      <li
        className={styles.legend}
        key="___legend___"
      >{props.legend}</li>
    );
  }

  const settingElements = [];
  Object.keys(props.settings).forEach(labelName => {
    const controlElement = props.settings[labelName];
    settingElements.push(
      <li
        className={styles.item}
        key={labelName}
      >
        <span className={styles.labelName}>{labelName}</span>
        <span className={styles.control}>{controlElement}</span>
      </li>
    );
  });

  return (
    <ul className={styles.base}>
      {settingLegend}
      {settingElements}
    </ul>
  );
};

SettingList.propTypes = {
  legend: React.PropTypes.string,
  settings: React.PropTypes.objectOf(React.PropTypes.node).isRequired,
};

SettingList.defaultProps = {
  legend: '',
};

export default SettingList;
