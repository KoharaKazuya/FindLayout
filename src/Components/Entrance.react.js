import React from 'react';
import TextInput from './TextInput.react';
import Button from './Button.react';
import styles from '../styles/entrance.css';

export default class Entrance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
    };

    this.onRoomIdChanged = this.onRoomIdChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onSelectRoom = props.onSelectRoom;
  }

  onRoomIdChanged(event) {
    this.setState({
      roomId: event.target.value,
    });
  }

  onSubmit() {
    this.onSelectRoom(this.state.roomId);
    this.setState({
      roomId: '',
    });
  }

  render() {
    return (
      <div className={styles.entrance}>
        <div className={styles.inputs}>
          <TextInput
            value={this.state.roomId}
            label="ルーム名"
            onChange={this.onRoomIdChanged}
          />
          <TextInput
            label="ニックネーム"
          />
        </div>
        <div className={styles.actions}>
          <Button type="flat" onClick={this.onSubmit} text="入室" />
        </div>
      </div>
    );
  }
}

Entrance.propTypes = {
  onSelectRoom: React.PropTypes.func,
};

Entrance.defaultProps = {
  onSelectRoom: () => {},
};
