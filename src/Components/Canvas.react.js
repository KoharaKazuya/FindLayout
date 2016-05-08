import React from 'react';
import Box from './Box.react';
import editorModes from '../editorModes';
import styles from '../styles/canvas.css';

/**
 * 指定要素のページ左上からのオフセット量を算出する
 *
 * @param {DOMElement} el - オフセット量を算出したい DOM 要素
 * @return {Object} {x, y} オフセット量
 */
function getPosition(el) {
  if (!el) {
    return { x: 0, y: 0 };
  }

  const parentPosition = getPosition(el.offsetParent);
  return {
    x: parentPosition.x + el.offsetLeft - el.scrollLeft + el.clientLeft,
    y: parentPosition.y + el.offsetTop - el.scrollTop + el.clientTop,
  };
}

/**
 * 指定要素のカスタム data 属性に付与されている Box ID を取得する
 * 見つからない場合は、先祖要素を探索する
 *
 * @param {DOMElement} el - 探索したい DOM 要素
 * @param {Number|Null} 見つかれば Box ID, 見つからなければ null
 */
function getBoxId(el) {
  // el が null なら未発見として中断
  if (!el) return null;
  // dataset から抽出
  if (el && el.dataset && el.dataset.boxId && !isNaN(Number(el.dataset.boxId))) {
    return Number(el.dataset.boxId);
  }
  // 親方向への探索
  const parentBoxId = getBoxId(el.parentElement);
  if (parentBoxId !== null) return parentBoxId;
  // 見つからなければ null
  return null;
}

export default class Canvas extends React.Component {
  constructor(props) {
    super();
    this.state = {
      dragStartX: null,
      dragStartY: null,
      draggingX: null,
      draggingY: null,
    };
    this.props = props;
    // bind handlers
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    // instance functions
    this.snapToGrid = v => Math.round(v / props.gridSize) * props.gridSize;
  }

  /**
   * キャンバス内でマウスを押下したとき
   */
  onMouseDown(event) {
    // クリック判定のための初期化
    this.setState({ isDrag: false, isMove: false });

    // 選択済みのボックスの上でのマウス押下かどうか
    const targetBoxId = getBoxId(event.target);
    const onSelectedBox = this.props.selectedBoxIds.indexOf(targetBoxId) >= 0;
    if (onSelectedBox) {
      const canvasPos = getPosition(event.currentTarget);
      return this.setState({
        isMove: true,
        dragStartX: this.snapToGrid(event.clientX - canvasPos.x),
        dragStartY: this.snapToGrid(event.clientY - canvasPos.y),
        draggingX: this.snapToGrid(event.clientX - canvasPos.x),
        draggingY: this.snapToGrid(event.clientY - canvasPos.y),
      });
    }

    const newBoxId = Math.floor((1 << 30) * Math.random());
    const canvasPos = getPosition(event.currentTarget);
    return this.setState({
      draggingBoxId: newBoxId,
      dragStartX: this.snapToGrid(event.clientX - canvasPos.x),
      dragStartY: this.snapToGrid(event.clientY - canvasPos.y),
      draggingX: this.snapToGrid(event.clientX - canvasPos.x),
      draggingY: this.snapToGrid(event.clientY - canvasPos.y),
    });
  }

  /**
   * キャンバス内でマウスを移動させたとき
   */
  onMouseMove(event) {
    // ドラッグ中 (= マウス左ボタンが押下されている) でなければ、即座に中断
    if ((event.buttons & 1) === 0) {
      this.resetDraggingBox();
      return;
    }

    const canvasPos = getPosition(event.currentTarget);
    this.setState({
      draggingX: this.snapToGrid(event.clientX - canvasPos.x),
      draggingY: this.snapToGrid(event.clientY - canvasPos.y),
    });

    // 少しでもドラッグ操作を検知すればドラッグ判定とする
    if (this.state.dragStartX !== this.state.draggingX ||
      this.state.dragStartY !== this.state.draggingY) {
      this.setState({ isDrag: true });
    }
  }

  /**
   * キャンバス内でマウスを放したとき
   */
  onMouseUp(event) {
    // クリックかドラッグかを判定する
    if (this.state.isDrag) {
      if (this.state.isMove) {
        const offset = this.getMoveOffset();
        const selectedBoxes = this.props.boxes.filter(box =>
          this.props.selectedBoxIds.indexOf(box.id) >= 0);
        // ハンドラにドラッグ操作でボックスを移動したことを知らせる
        this.props.onMoveBoxes(selectedBoxes, offset);
      } else {
        const box = this.getDraggingBox();
        switch (this.props.mode) {
          case 'normal':
            // ハンドラにドラッグ操作でボックスを生成したことを知らせる
            this.props.onSelectBoxes([]);
            if (box) this.props.onGenerateBox(box);
            break;
          case 'select-box': {
            // 選択範囲と重なる全てのボックスを選択状態とする
            const intersectedBoxes = this.props.boxes.filter(b =>
                (b.x < box.x + box.width) &&
                (b.x + b.width > box.x) &&
                (b.y < box.y + box.height) &&
                (b.y + b.height > box.y)
            );
            this.props.onSelectBoxes(intersectedBoxes);
            // 一括選択モードは一度選択すると終了する
            this.props.onChangeMode('normal');
            break;
          }
          default:
        }
      }
      // ドラッグ操作を終了する
      this.resetDraggingBox();
    } else {
      // クリックしたボックスをハンドラに知らせる
      const clickedBoxId = getBoxId(event.target);
      const foundBoxes = this.props.boxes.filter(box => box.id === clickedBoxId);
      if (foundBoxes.length === 1) {
        this.props.onSelectBoxes(foundBoxes);
      } else {
        this.props.onSelectBoxes([]);
      }
    }
  }

  getDraggingBox() {
    if (!this.isDragging()) return undefined;

    // ボックスの位置と大きさを計算
    const box = {
      id: this.state.draggingBoxId,
      x: Math.min(this.state.dragStartX, this.state.draggingX),
      y: Math.min(this.state.dragStartY, this.state.draggingY),
      width: Math.abs(this.state.draggingX - this.state.dragStartX),
      height: Math.abs(this.state.draggingY - this.state.dragStartY),
    };

    // 幅と高さが両方 0 ならクリック判定
    if (box.width === 0 && box.height === 0) return undefined;

    // 幅または高さが 0 のときは線として判定
    if (box.width === 0) box.width = 1;
    if (box.height === 0) box.height = 1;

    return box;
  }

  getMoveOffset() {
    if (!this.state.isMove) return undefined;
    return {
      x: this.state.draggingX - this.state.dragStartX,
      y: this.state.draggingY - this.state.dragStartY,
    };
  }

  resetDraggingBox() {
    this.setState({
      draggingBoxId: null,
      dragStartX: null,
      dragStartY: null,
      draggingX: null,
      draggingY: null,
    });
  }

  isDragging() {
    return (typeof this.state.draggingBoxId === 'number') &&
      (typeof this.state.dragStartX === 'number') &&
      (typeof this.state.dragStartY === 'number') &&
      (typeof this.state.draggingX === 'number') &&
      (typeof this.state.draggingY === 'number');
  }

  render() {
    const style = {
      width: this.snapToGrid(this.props.width),
      height: this.snapToGrid(this.props.height),
    };

    // ドラッグ操作中を示す、擬似ボックスを生成
    const draggingBox = this.getDraggingBox();

    // 移動操作を示す、移動量と選択中かどうかのマップ
    const moveOffset = this.getMoveOffset();
    const selectedBoxMap = {};
    this.props.boxes.forEach(box => {
      selectedBoxMap[box.id] = this.props.selectedBoxIds.indexOf(box.id) >= 0;
    });

    // 各ボックスの z-index を算出
    const zIndexMap = {};
    this.props.boxes.forEach((box, i) => {
      const order = this.props.boxesOrder.indexOf(box.id);
      if (order >= 0) {
        zIndexMap[box.id] = this.props.boxes.length - 1 - order;
      } else {
        zIndexMap[box.id] = i + this.props.boxes.length;
      }
    });

    return (
      <div
        className={styles.base}
        style={style}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        {this.props.boxes.map(box => (<Box
          key={box.id}
          id={box.id}
          x={moveOffset && selectedBoxMap[box.id] ? box.x + moveOffset.x : box.x}
          y={moveOffset && selectedBoxMap[box.id] ? box.y + moveOffset.y : box.y}
          width={box.width}
          height={box.height}
          zindex={zIndexMap[box.id]}
          text={box.text}
          textColor={box.textColor}
          backgroundColor={box.backgroundColor}
          onChangeText={(text) => this.props.onChangeBoxText(box.id, text)}
          unselected={
            this.props.selectedBoxIds.length > 0 &&
            this.props.selectedBoxIds.indexOf(box.id) < 0
          }
        />))}
        {draggingBox ? (<Box
          key={draggingBox.id}
          id={draggingBox.id}
          x={draggingBox.x}
          y={draggingBox.y}
          width={draggingBox.width}
          height={draggingBox.height}
          zindex={99999}
        />) : undefined}
      </div>
    );
  }
}

Canvas.propTypes = {
  /**
   * グリッドサイズ
   */
  gridSize: React.PropTypes.number,
  /**
   * キャンバス全体の幅 (px)
   */
  width: React.PropTypes.number.isRequired,
  /**
   * キャンバス全体の高さ (px)
   */
  height: React.PropTypes.number.isRequired,
  /**
   * (生成済み) ボックス一覧
   */
  boxes: React.PropTypes.array,
  /**
   * 選択状態中ボックスの ID 一覧
   */
  selectedBoxIds: React.PropTypes.array,
  /**
   * ボックスの重なり順 (ID 一覧)
   */
  boxesOrder: React.PropTypes.array,
  /**
   * ボックスを生成したときに呼ばれる関数
   *
   * @param {Box} box - 生成したボックスオブジェクト
   */
  onGenerateBox: React.PropTypes.func,
  /**
   * ボックスを移動したときに呼ばれる関数
   *
   * @param {Array<Box>} boxes - 移動するボックスオブジェクトの一覧
   * @param {Object} offset - {x, y} 移動量
   */
  onMoveBoxes: React.PropTypes.func,
  /**
   * ボックスを選択したときに呼ばれる関数
   *
   * @param {Array<Box>} boxes - 選択するボックスオブジェクトの一覧
   */
  onSelectBoxes: React.PropTypes.func,
  /**
   * ボックスのサイズを変更したときに呼ばれる関数
   *
   * @param {Box} box - サイズを変更するボックスオブジェクト
   * @param {Object} size - {width, height} 変更後のサイズ
   */
  onResizeBox: React.PropTypes.func,
  mode: React.PropTypes.oneOf(editorModes),
  onChangeMode: React.PropTypes.func,
  /**
   * ボックスのテキストを変更したときに呼ばれる関数
   *
   * @param {Number} boxId - テキストを変更するボックスの ID
   * @param {String} text - 変更後のテキスト
   */
  onChangeBoxText: React.PropTypes.func,
};

Canvas.defaultProps = {
  gridSize: 20,
  boxes: [],
  selectedBoxIds: [],
  boxesOrder: [],
  onGenerateBox: () => {},
  onMoveBoxes: () => {},
  onSelectBoxes: () => {},
  onResizeBox: () => {},
  mode: 'normal',
  onChangeMode: () => {},
  onChangeBoxText: () => {},
};
