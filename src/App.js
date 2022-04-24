import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from '@material-ui/core';
import './App.css';
import { call } from './service/ApiService';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [ ]
        };
    }

    // 각 컴포넌트들의 render 함수를 콜해 DOM 트리를 구성(마운트) 후에 호출되는 함수
    componentDidMount() {
        call('/todo', 'GET', null).then((response) => this.setState({ items: response.data }));
    }

    // AddTodo 에서 + 버튼 클릭 시 수행
    add = (item) => {
        call('/todo', 'POST', item).then((response) => this.setState({ items: response.data }));
    }

    // Todo 에서 삭제버튼 클릭 시 수행
    delete = (item) => {
        call('/todo', 'DELETE', item).then((response) => this.setState({ items: response.data }));
    }

    // Todo 에서 제목 수정 시 수행
    update = (item) => {
        call('/todo', 'PUT', item).then((response) => this.setState({ items: response.data }));
    }

    render() {
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
                    ))}
                </List>
            </Paper>
        );

        return (
            <div className="app">
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
                
            </div>);
    }
}

export default App;
