import React from 'react';
import Canvas from './Canvas.react';
import ToolBar from './ToolBar.react';
import editorModes from '../editorModes';
import styles from '../styles/editor.css';

const Editor = props => {
  // ウィンドウの大きさからキャンバスに使える領域を計算
  const mainStyle = {
    width: document.documentElement.clientWidth - 320,
    height: document.documentElement.clientHeight,
  };

  return (
    <div className={styles.base}>
      <ToolBar
        mode={props.mode}
        onChangeMode={props.onChangeMode}
        canvasWidth={props.canvasWidth}
        canvasHeight={props.canvasHeight}
        onChangeCanvasSize={props.onChangeCanvasSize}
        selectedBoxes={props.boxes.filter(box => props.selectedBoxIds.indexOf(box.id) >= 0)}
        boxesOrder={props.boxesOrder}
        onChangeBoxesTextColor={props.onChangeBoxesTextColor}
        onChangeBoxesBackgroundColor={props.onChangeBoxesBackgroundColor}
        onPullBoxes={props.onPullBoxes}
        onDeleteBoxes={props.onDeleteBoxes}
      />
      <main className={styles.main} style={mainStyle}>
        <div className={styles.centerizer}>
          <Canvas
            mode={props.mode}
            onChangeMode={props.onChangeMode}
            width={props.canvasWidth}
            height={props.canvasHeight}
            boxes={props.boxes}
            selectedBoxIds={props.selectedBoxIds}
            boxesOrder={props.boxesOrder}
            onGenerateBox={props.onGenerateBox}
            onMoveBoxes={props.onMoveBoxes}
            onSelectBoxes={props.onSelectBoxes}
            onChangeBoxText={props.onChangeBoxText}
          />
        </div>
      </main>
    </div>
  );
};

Editor.propTypes = {
  /**
   * エディターモード
   */
  mode: React.PropTypes.oneOf(editorModes),
  onChangeMode: React.PropTypes.func,
  canvasWidth: React.PropTypes.number.isRequired,
  canvasHeight: React.PropTypes.number.isRequired,
  onChangeCanvasSize: React.PropTypes.func,
  boxes: React.PropTypes.array,
  selectedBoxIds: React.PropTypes.array,
  boxesOrder: React.PropTypes.array,
  onGenerateBox: React.PropTypes.func,
  onMoveBoxes: React.PropTypes.func,
  onSelectBoxes: React.PropTypes.func,
  onChangeBoxesTextColor: React.PropTypes.func,
  onChangeBoxesBackgroundColor: React.PropTypes.func,
  onPullBoxes: React.PropTypes.func,
  onDeleteBoxes: React.PropTypes.func,
  onChangeBoxText: React.PropTypes.func,
};

Editor.defaultProps = {
  mode: 'normal',
  onChangeMode: () => {},
  onChangeCanvasSize: () => {},
  boxes: [],
  selectedBoxIds: [],
  boxesOrder: [],
  onGenerateBox: () => {},
  onMoveBoxes: () => {},
  onSelectBoxes: () => {},
  onChangeBoxesTextColor: () => {},
  onChangeBoxesBackgroundColor: () => {},
  onPullBoxes: () => {},
  onDeleteBoxes: () => {},
  onChangeBoxText: () => {},
};

export default Editor;
