import React, { useState, useCallback } from 'react';
import BoardItem from './Admin_BoardItem';
import Admin_menu from './Admin_menu'
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import Title from './Admin_order_title';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

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
                width={70}
                height={70}
                strokeWidth={15}
                rotate={0}
                color='#444444'
                borderRadius={0}
                animationDuration={0.5}
            />
            <div align="center">
                <Grid item xs={7} align="center">
                    <Paper align="center">
                        <br></br>
                        <Title>주문 목록</Title>
                        <br></br>
                        <Table size="small" align="center">
                            <tbody>
                                <TableRow>
                                    <TableCell width="70">번호</TableCell>
                                    <TableCell width="80">포장여부</TableCell>
                                    <TableCell width="500">주문건</TableCell>
                                    <TableCell width="100">총 금액</TableCell>
                                    <TableCell width="200">구매 시각</TableCell>
                                </TableRow>
                                {
                                    state.boards.map(row =>
                                        (<BoardItem key={row.brdno} row={row} onRemove={handleRemove} onSelectRow={handleSelectRow} />)
                                    )
                                }
                            </tbody>
                        </Table>
                    </Paper>
                </Grid>
            </div>
        </div>
    );
};

export default Admin_order_list;