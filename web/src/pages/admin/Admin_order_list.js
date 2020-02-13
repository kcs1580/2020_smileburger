import React, { Component } from 'react';
import BoardForm from './App_BoardForm';
import BoardItem from './App_BoardItem';

/*
    component files.///
*/
class App extends Component {

    state = {
        maxNo: 3,
        boards: [
            {
                brdno: 1,
                brdwriter: '3',
                brdtitle: '준영이',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: '5',
                brdtitle: '창수이',
                brddate: new Date()
            },
            {
                brdno: 3,
                brdwriter: '3',
                brdtitle: '상돈형',
                brddate: new Date()
            },
            {
                brdno: 4,
                brdwriter: '15',
                brdtitle: '',
                brddate: new Date()
            },
            {
                brdno: 5,
                brdwriter: '8',
                brdtitle: '태환이',
                brddate: new Date()
            },
            {
                brdno: 6,
                brdwriter: '200',
                brdtitle: '나님',
                brddate: new Date()
            }
        ],
        selectedBoard: {}
    }

    handleSaveData = (data) => {
        if (!data.brdno) {            // new : Insert
            this.setState({
                maxNo: this.state.maxNo + 1,
                boards: this.state.boards.concat({ brdno: this.state.maxNo, brddate: new Date(), ...data }),
                selectedBoard: {}
            });
        } else if (data.brdno) {                                                        // Update
            this.setState({
                boards: this.state.boards.map(row => data.brdno === row.brdno ? { ...data } : row),
                selectedBoard: {}
            })
        }
    }

    handleRemove = (brdno) => {
        this.setState({
            boards: this.state.boards.filter(row => row.brdno !== brdno)
        })
    }

    handleSelectRow = (row) => {
        this.setState({ selectedBoard: row });
    }

    render() {
        const { boards, selectedBoard } = this.state;

        return (
            <div className="App-BoardForm">
                <h1>관리자 페이지 - 주문 목록 페이지 입니다.</h1>
                <BoardForm selectedBoard={selectedBoard} onSaveData={this.handleSaveData} />
                <table classname="App-table" border="2">
                    <tbody>
                        <tr align="center">
                            <td width="50">번호</td>
                            <td width="100">주문자</td>
                            <td width="100">주문수</td>
                            <td width="200">날짜</td>
                        </tr>
                        {
                            boards.map(row =>
                                (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />)
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;

//0131