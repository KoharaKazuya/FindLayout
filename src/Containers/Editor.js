import { connect } from 'react-redux';
import Editor from '../Components/Editor.react';
import {
  generateBox,
  selectBoxes,
  moveBoxes,
  changeEditorMode,
  changeCanvasSize,
  changeBoxesTextColor,
  changeBoxesBackgroundColor,
  pullBoxes,
  deleteBoxes,
  changeBoxText,
} from '../actions/editorActions';

function mapStateToProps(state) {
  return {
    mode: state.editor.mode,
    canvasWidth: state.editor.canvas.width,
    canvasHeight: state.editor.canvas.height,
    boxes: state.editor.boxes,
    selectedBoxIds: state.editor.selectedBoxIds,
    boxesOrder: state.editor.boxesOrder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeMode: (mode) => dispatch(changeEditorMode(mode)),
    onChangeCanvasSize: (width, height) => dispatch(changeCanvasSize(width, height)),
    onGenerateBox: (box) => dispatch(generateBox(box)),
    onMoveBoxes: (boxes, offset) => dispatch(moveBoxes(boxes, offset)),
    onSelectBoxes: (boxes) => dispatch(selectBoxes(boxes)),
    onChangeBoxesTextColor: (boxIds, color) =>
      dispatch(changeBoxesTextColor(boxIds, color)),
    onChangeBoxesBackgroundColor: (boxes, backgroundColor) =>
      dispatch(changeBoxesBackgroundColor(boxes, backgroundColor)),
    onPullBoxes: (boxIds) => dispatch(pullBoxes(boxIds)),
    onDeleteBoxes: (boxes) => dispatch(deleteBoxes(boxes)),
    onChangeBoxText: (boxId, text) => dispatch(changeBoxText(boxId, text)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
