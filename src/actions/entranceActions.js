import { JOIN_ROOM } from '../actionTypes';

export function joinRoom(roomId) {
  return {
    type: JOIN_ROOM,
    roomId,
  };
}
