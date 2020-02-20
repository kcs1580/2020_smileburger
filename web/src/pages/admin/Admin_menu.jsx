import React from 'react'
import './Admin_menu.css'
import { Link } from 'react-router-dom'

const MenuItem = ({ children, to }) => (
    <Link to={to}>
        {children}
    </Link>
)

const Admin_menu = () => {
    return (
        <div className="menu" >
            <div className="menu-item">
                <MenuItem to={'/Admin_main'}><p className="menu-item01">관리자 메인 홈</p></MenuItem>
            </div>

            <div className="menu-item">
                <MenuItem to={'/Admin_order_list'}><p>주문 목록</p></MenuItem>
            </div>

            <div className="menu-item">
                <MenuItem to={'/Admin_store'}><p>매장 관리</p></MenuItem>
            </div>

            <div className="menu-item">
                <MenuItem to={'/Admin_kiosk'}><p>키오스크 관리</p></MenuItem>
            </div>
            <br></br>
            <p className="hint">관리하고자 하는 메뉴를<br></br> 클릭해 주세요</p>
        </div >
    );
};

export default Admin_menu
