import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
        this.update = props.update;
    }

    // 삭제버튼 클릭 시 수행될 event handler
    deleteEventHandler = (e) => {
        this.delete(this.state.item);
    }

    // title 부분을 클릭 시 this.state.readOnly 토글
    offReadOnlyMode = (e) => {
        console.log("Event!", this.state.readOnly);
        this.setState({ readOnly: false }, () => {
            console.log("toggled readonly", this.state.readOnly);
        });
    }

    // Enter 키를 누르면 readOnly를 true 로 변경
    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter') {
            this.setState({ readOnly: true });
            this.update(this.state.item);
        }
    }

    // readOnly false 상태에서 키를 입력하면 item을 새 값으로 변경
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    // 체크박스를 클릭하면 done 을 업데이트
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem }, () => {
            this.update(this.state.item);
        });
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} disableRipple onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;