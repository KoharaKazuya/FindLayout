import {
  GENERATE_BOX,
  SELECT_BOXES,
  MOVE_BOXES,
  CHANGE_EDITOR_MODE,
  CHANGE_CANVAS_SIZE,
  CHANGE_BOXES_TEXT_COLOR,
  CHANGE_BOXES_BACKGROUND_COLOR,
  DELETE_BOXES,
  CHANGE_BOX_TEXT,
  PULL_BOXES,
} from '../actionTypes';

export function generateBox(box) {
  return {
    type: GENERATE_BOX,
    box,
  };
}

export function selectBoxes(boxes) {
  return {
    type: SELECT_BOXES,
    boxes,
  };
}

export function moveBoxes(boxes, offset) {
  return {
    type: MOVE_BOXES,
    boxes,
    offset,
  };
}

export function changeEditorMode(mode) {
  return {
    type: CHANGE_EDITOR_MODE,
    mode,
  };
}

export function changeCanvasSize(width, height) {
  return {
    type: CHANGE_CANVAS_SIZE,
    width,
    height,
  };
}

export function changeBoxesTextColor(boxIds, color) {
  return {
    type: CHANGE_BOXES_TEXT_COLOR,
    boxIds,
    color,
  };
}

export function changeBoxesBackgroundColor(boxes, backgroundColor) {
  return {
    type: CHANGE_BOXES_BACKGROUND_COLOR,
    boxes,
    backgroundColor,
  };
}

export function deleteBoxes(boxes) {
  return {
    type: DELETE_BOXES,
    boxes,
  };
}

export function changeBoxText(boxId, text) {
  return {
    type: CHANGE_BOX_TEXT,
    boxId,
    text,
  };
}

export function pullBoxes(boxIds) {
  return {
    type: PULL_BOXES,
    boxIds,
  };
}
