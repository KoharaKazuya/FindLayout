import React from 'react';
import DelayInput from './DelayInput.react';
import SettingList from './SettingList.react';
import Button from './Button.react';
import Switch from './Switch.react';
import ColorPicker from './ColorPicker.react';
import editorModes from '../editorModes';
import styles from '../styles/toolbar.css';

const ToolBar = props => {
  function onChangeModeToSelectBox() {
    const newMode = props.mode === 'select-box' ? 'normal' : 'select-box';
    props.onChangeMode(newMode);
  }

  function onChangeBoxesTextColor(color) {
    props.onChangeBoxesTextColor(props.selectedBoxes.map(box => box.id), color);
  }

  function onChangeBoxesBackgroundColor(color) {
    props.onChangeBoxesBackgroundColor(props.selectedBoxes, color);
  }

  function onClickPullButton() {
    props.onPullBoxes(props.selectedBoxes.map(box => box.id));
  }

  function onClickDeleteButton() {
    props.onDeleteBoxes(props.selectedBoxes);
  }

  // 選択中のボックスの共通プロパティを抽出
  // (テキスト色)
  let textColor = '#000000';
  if (props.selectedBoxes.length > 0) {
    textColor = props.selectedBoxes[0].textColor;
    if (typeof textColor !== 'string' ||
        !textColor.match(/#[0-9a-fA-F]{6}/) ||
        !props.selectedBoxes.every(box => box.textColor === textColor)) {
      textColor = '#000000';
    }
  }
  // (背景色)
  let backgroundColor = '#000000';
  if (props.selectedBoxes.length > 0) {
    backgroundColor = props.selectedBoxes[0].backgroundColor;
    if (typeof backgroundColor !== 'string' ||
        !backgroundColor.match(/#[0-9a-fA-F]{6}/) ||
        !props.selectedBoxes.every(box => box.backgroundColor === backgroundColor)) {
      backgroundColor = '#000000';
    }
  }

  return (
    <div className={styles.base}>
      <SettingList
        legend="キャンバス設定"
        settings={{
          キャンバスサイズ: (
            <span>
              <DelayInput
                type="number"
                value={props.canvasWidth}
                onDetermine={value => props.onChangeCanvasSize(Number(value), props.canvasHeight)}
                style={{ display: 'inline-block', width: 40 }}
              /> × <DelayInput
                type="number"
                value={props.canvasHeight}
                onDetermine={value => props.onChangeCanvasSize(props.canvasWidth, Number(value))}
                style={{ display: 'inline-block', width: 40 }}
              />
            </span>
          ),
          一括選択モード: (
            <Switch
              active={props.mode === 'select-box'}
              onToggle={onChangeModeToSelectBox}
            />
          ),
        }}
      />
      <SettingList
        legend="ボックス設定"
        settings={{
          テキスト色: (
            <ColorPicker
              value={textColor}
              onChange={onChangeBoxesTextColor}
            />
          ),
          背景色: (
            <ColorPicker
              value={backgroundColor}
              onChange={onChangeBoxesBackgroundColor}
            />
          ),
          前面に移動: (
            <Button type="denseFlat" text="実行" onClick={onClickPullButton} />
          ),
          背面に移動: (
            <Button type="denseFlat" text="実行" />
          ),
          削除: (
            <Button type="denseFlat" text="実行" onClick={onClickDeleteButton} />
          ),
        }}
      />
      <div>Boxes: {props.selectedBoxes.map(b => b.id).join(', ')}</div>
      <div>Boxes Order: {props.boxesOrder.join(', ')}</div>
    </div>
  );
};

ToolBar.propTypes = {
  /**
   * エディターモード
   */
  mode: React.PropTypes.oneOf(editorModes).isRequired,
  /**
   * エディターモードが変更されたときのハンドラ
   */
  onChangeMode: React.PropTypes.func,
  /**
   * キャンバスの大きさ
   */
  canvasWidth: React.PropTypes.number.isRequired,
  canvasHeight: React.PropTypes.number.isRequired,
  onChangeCanvasSize: React.PropTypes.func,
  /**
   * 選択中のボックスオブジェクト一覧
   */
  selectedBoxes: React.PropTypes.array,
  /**
   * ボックスの重なり順 (ID 一覧)
   */
  boxesOrder: React.PropTypes.array,
  onChangeBoxesTextColor: React.PropTypes.func,
  onChangeBoxesBackgroundColor: React.PropTypes.func,
  onPullBoxes: React.PropTypes.func,
  onDeleteBoxes: React.PropTypes.func,
};

ToolBar.defaultProps = {
  onChangeMode: () => {},
  onChangeCanvasSize: () => {},
  selectedBoxes: [],
  boxesOrder: [],
  onChangeBoxesTextColor: () => {},
  onChangeBoxesBackgroundColor: () => {},
  onPullBoxes: () => {},
  onDeleteBoxes: () => {},
};

export default ToolBar;
