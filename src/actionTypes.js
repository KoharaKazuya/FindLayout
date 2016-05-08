module.exports = {
  // 何もしない
  NOOP: 'NOOP',
  // 作業部屋に入る (リクエスト)
  JOIN_ROOM: 'server/JOIN_ROOM',
  // 作業部屋に入る (レスポンス)
  UPDATE_ROOM: 'UPDATE_ROOM',
  // Server -> Client のキャンバス状態変更通知
  CANVAS_UPDATE: 'CANVAS_UPDATE',
  // Server -> Client のボックス状態変更通知
  BOXES_UPDATE: 'BOXES_UPDATE',
  // ボックスを生成する
  GENERATE_BOX: 'server/GENERATE_BOX',
  // ボックスを選択する
  SELECT_BOXES: 'SELECT_BOXES',
  // ボックスを移動する
  MOVE_BOXES: 'server/MOVE_BOXES',
  // エディータモードを変更する
  CHANGE_EDITOR_MODE: 'CHANGE_EDITOR_MODE',
  // キャンバスサイズを変更する
  CHANGE_CANVAS_SIZE: 'server/CHANGE_CANVAS_SIZE',
  // ボックスのテキスト色を変更する
  CHANGE_BOXES_TEXT_COLOR: 'server/CHANGE_BOXES_TEXT_COLOR',
  // ボックスの背景色を変更する
  CHANGE_BOXES_BACKGROUND_COLOR: 'server/CHANGE_BOXES_BACKGROUND_COLOR',
  // ボックスを削除する
  DELETE_BOXES: 'server/DELETE_BOXES',
  // ボックスのテキストを変更する
  CHANGE_BOX_TEXT: 'server/CHANGE_BOX_TEXT',
  // ボックスを前に
  PULL_BOXES: 'server/PULL_BOXES',
};
