import React, { useState, useCallback } from 'react'
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import Admin_menu from './Admin_menu'
import Admin_login from './Admin_login'
import Button from '@material-ui/core/Button';

const contentStyles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
}

const Admin_main = () => {
    const [can, setCan] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = useCallback(() => {
        setMenuOpen(true);
    }, [menuOpen]);
    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, [menuOpen]);
    if (can) {
        return (
            <div>
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
                <div>
                    <div style={contentStyles}>
                        <h1>솔라시 키오스크 관리</h1>
                        <p>관리자 페이지에 오신것을 환영합니다.</p>
                        <br></br>
                        <img src="admin_img.png" alt="admin Image"></img>
                        <br></br><br></br><br></br>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            width="40"
                            className="logout"
                            href="/Admin_main"
                        >
                            Logout
                     </Button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div style={contentStyles}>
                <h1>솔라시 키오스크 관리</h1>
                <p>관리자 페이지에 로그인해 주시기 바랍니다.</p>
                <br></br>
                <img src="admin_img.png" alt="admin Image"></img>
                <Admin_login setCan={setCan}></Admin_login>
            </div>
        </div>
    );
};

export default Admin_main