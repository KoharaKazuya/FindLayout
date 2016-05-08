import React from 'react';
import styles from '../styles/form/textInput.css';

const INPUT_TYPES = [
  'text',
  'number',
];

/**
 * 現在入力中の値を保護しつつ、props の変更に合わせて現在値を変更できる入力欄。
 * 入力欄内でのエンターキーおよび、入力欄からフォーますを外した際に onDetermine を呼ぶ
 */
export default class DelayInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      focus: false,
    };

    // bind handlers
    this.onInput = this.onInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // 入力中でなければ、与えられた props に合わせて現在地を更新
    if (!this.state.focus) this.setState({ value: nextProps.value });
  }

  onInput(event) {
    // エンターキーが押されたら、決定と認識する
    if (event.key === 'Enter') {
      this.props.onDetermine(this.state.value);
    }
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.props.onDetermine(this.state.value);
    this.setState({ focus: false });
  }

  render() {
    return (
      <input
        style={this.props.style}
        className={styles.input}
        type={this.props.type}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onInput}
      />
    );
  }
}

DelayInput.propTypes = {
  style: React.PropTypes.object,
  /**
   * input タグのタイプ
   * (INPUT_TYPES のいずれか)
   */
  type: React.PropTypes.oneOf(INPUT_TYPES),
  /**
   * 入力の現在値
   */
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  /**
   * 入力内容が確定したときに呼ばれる
   *
   * @param {String} value - 入力値
   */
  onDetermine: React.PropTypes.func,
};

DelayInput.defaultProps = {
  type: 'text',
  value: '',
  onDetermine: () => {},
};
