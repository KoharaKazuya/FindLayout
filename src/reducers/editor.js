const actionTypes = require('../actionTypes');
const editorModes = require('../editorModes');

function editor(state = {
  canvas: { width: 1280, height: 720 },
}, action) {
  switch (action.type) {
    case actionTypes.CANVAS_UPDATE:
      return Object.assign({}, state, {
        canvas: action.canvas,
      });
    case actionTypes.BOXES_UPDATE:
      return Object.assign({}, state, {
        boxes: action.boxes,
        boxesOrder: action.boxesOrder,
      });
    case actionTypes.GENERATE_BOX: {
      const newBoxId = Math.floor((1 << 30) * Math.random());
      return Object.assign({}, state, {
        boxes: [
          ...(state.boxes || []),
          Object.assign({
            id: newBoxId,
            textColor: '#000000',
            backgroundColor: '#ffffff',
          }, action.box),
        ],
      });
    }
    case actionTypes.SELECT_BOXES: {
      // アクションで指定されたボックスのみ選択状態にする
      return Object.assign({}, state, {
        selectedBoxIds: action.boxes.map(box => box.id),
      });
    }
    case actionTypes.MOVE_BOXES: {
      const movedBoxes = (state.boxes || []).map(box => {
        const isTargetBox = action.boxes.some(b => b.id === box.id);
        return Object.assign({}, box, {
          x: box.x + (isTargetBox ? action.offset.x : 0),
          y: box.y + (isTargetBox ? action.offset.y : 0),
        });
      });
      return Object.assign({}, state, {
        boxes: movedBoxes,
      });
    }
    case actionTypes.CHANGE_EDITOR_MODE: {
      const isValid = editorModes.indexOf(action.mode) >= 0;
      return Object.assign({}, state, { mode: isValid ? action.mode : state.mode });
    }
    case actionTypes.CHANGE_BOXES_TEXT_COLOR: {
      const coloredBoxes = (state.boxes || []).map(box => {
        const isTargetBox = action.boxIds.indexOf(box.id) >= 0;
        return Object.assign({}, box, {
          textColor: isTargetBox ? action.color : box.textColor,
        });
      });
      return Object.assign({}, state, {
        boxes: coloredBoxes,
      });
    }
    case actionTypes.CHANGE_BOXES_BACKGROUND_COLOR: {
      const coloredBoxes = (state.boxes || []).map(box => {
        const isTargetBox = action.boxes.some(b => b.id === box.id);
        return Object.assign({}, box, {
          backgroundColor: isTargetBox ? action.backgroundColor : box.backgroundColor,
        });
      });
      return Object.assign({}, state, {
        boxes: coloredBoxes,
      });
    }
    case actionTypes.DELETE_BOXES: {
      return Object.assign({}, state, {
        boxes: (state.boxes || []).filter(box =>
          action.boxes.every(b => b.id !== box.id)),
      });
    }
    case actionTypes.CHANGE_BOX_TEXT: {
      return Object.assign({}, state, {
        boxes: (state.boxes || []).map(box => {
          if (box.id === action.boxId) {
            return Object.assign({}, box, { text: action.text });
          }
          return box;
        }),
      });
    }
    case actionTypes.CHANGE_CANVAS_SIZE: {
      return Object.assign({}, state, {
        canvas: Object.assign({}, state.canvas, {
          width: action.width,
          height: action.height,
        }),
      });
    }
    case actionTypes.PULL_BOXES: {
      // 指定ボックスが空なら何もせず終了
      const boxIds = (state.boxes || []).map(box => box.id);
      const selectedBoxIds = action.boxIds.filter(id => boxIds.indexOf(id) >= 0);
      if (selectedBoxIds.length === 0) return state;
      // 以前の並び順を取得
      // ただし、boxesOrder に含まれない ID や存在しない ID が含まれる可能性があるので整理して取得
      const prevBoxesOrder = [].concat(boxIds);
      prevBoxesOrder.sort((a, b) => {
        const aIndex = (state.boxesOrder || []).indexOf(a);
        const bIndex = (state.boxesOrder || []).indexOf(b);
        if (bIndex < 0) return 1;
        if (aIndex < 0) return -1;
        return aIndex - bIndex;
      });
      // 指定ボックスのいずれかより前にあるもののうち最も後にあるものを、
      // 指定ボックスの最も後ろにあるものの、一つ後ろに移動
      const backendBoxIndex = selectedBoxIds.reduce((prev, curr) =>
        Math.max(prev, prevBoxesOrder.indexOf(curr)), 0);
      const frontBoxIds = prevBoxesOrder.slice(0, backendBoxIndex)
        .filter(id => selectedBoxIds.indexOf(id) < 0);
      if (frontBoxIds.length === 0) return state;
      const frontBoxIndex = prevBoxesOrder.indexOf(frontBoxIds.slice(-1)[0]);
      const boxesOrder = [
        ...prevBoxesOrder.slice(0, frontBoxIndex),
        ...prevBoxesOrder.slice(frontBoxIndex + 1, backendBoxIndex + 1),
        prevBoxesOrder[frontBoxIndex],
        ...prevBoxesOrder.slice(backendBoxIndex + 1),
      ];
      return Object.assign({}, state, { boxesOrder });
    }
    default:
      return state;
  }
}

module.exports = editor;
