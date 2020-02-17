import React, { useState, useCallback } from 'react';
import BoardForm from './Admin_BoardForm';
import BoardItem from './Admin_BoardItem';
import Admin_menu from './Admin_menu'
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'

function Admin_order_list() {

    const [state, setState] = useState({
        maxNo: 2,
        boards: [
            {
                brdno: 1,
                brdstore: '수완',
                brdwriter: '5',
                brdtitle: '솔라시',
                brdcost: '32,500',
                brddate: new Date()
            },
        ],
        selectedBoard: {}
    });

    const handleSaveData = (data) => {
        if (!data.brdno) {
            // new : Insert
            setState({
                maxNo: state.maxNo + 1,
                boards: state.boards.concat({ brdno: state.maxNo, brddate: new Date(), ...data }),
                selectedBoard: {}
            });
        } else if (data.brdno) {                                                        // Update
            setState({
                maxNo: state.maxNo,
                boards: state.boards.map(row => data.brdno === row.brdno ? { ...data } : row),
                selectedBoard: {}
            })
        }
    };

    const handleRemove = (brdno) => {
        setState({
            maxNo: state.maxNo,
            boards: state.boards.filter(row => row.brdno !== brdno),
            selectedBoard: {}
        })
    };

    const handleSelectRow = (row) => {
        setState({
            maxNo: state.maxNo,
            boards: state.boards,
            selectedBoard: row
        });
    };

    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = useCallback(() => {
        setMenuOpen(true);
    }, [menuOpen]);
    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, [menuOpen]);

    return (
        <div className="App-BoardForm">
            <br></br>
            <CheeseburgerMenu
                isOpen={menuOpen}
                closeCallback={closeMenu}>
                <Admin_menu />
            </CheeseburgerMenu>

            <HamburgerMenu
                isOpen={menuOpen}
                menuClicked={openMenu}
                width={50}
                height={50}
                strokeWidth={10}
                rotate={0}
                color='blue'
                borderRadius={0}
                animationDuration={0.5}
            />
            <h1 align="center">주문 목록</h1>
            <br></br>
            <BoardForm selectedBoard={state.selectedBoard} onSaveData={handleSaveData} />
            <br></br>
            <table border="2" align="center">
                <tbody>
                    <tr>
                        <td width="60">번호</td>
                        <td width="60">지점</td>
                        <td width="100">주문자</td>
                        <td width="500">주문건</td>
                        <td width="100">총 금액</td>
                        <td width="200">구매 시각</td>
                    </tr>
                    <tr>
                        <tb>
                            {
                                state.boards.map(row =>
                                    (<BoardItem key={row.brdno} row={row} onRemove={handleRemove} onSelectRow={handleSelectRow} />)
                                )
                            }
                        </tb>
                        <tb>
                            {
                                state.boards.map(row =>
                                    (<BoardItem key={row.brdno} row={row} onRemove={handleRemove} onSelectRow={handleSelectRow} />)
                                )
                            }
                        </tb>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default Admin_order_list;