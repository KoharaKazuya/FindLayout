import React from 'react';
import styles from '../styles/form/textInput.css';

/**
 * テキスト入力欄 (placeholder 付き)
 */
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: false };
    // bind handlers
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  render() {
    return (
      <div className={styles.base}>
        <label
          className={this.state.focus ? styles.label_focus : styles.label}
        >{this.props.label}</label>
        <input
          className={this.state.focus ? styles.input_focus : styles.input}
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

TextInput.defaultProps = {
  value: '',
  label: '',
  onChange: () => {},
};
