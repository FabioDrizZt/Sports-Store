import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

function Userok() {
    return(
        <div className="ok">
            <div >
                <Result
                    icon={<UserOutlined />}
                    title="Hemos creado tu cuenta"
                    extra={<Link to={"/login"}><Button type="danger">OK</Button></Link>}
                />
            </div>
        </div>
    )
}

export default Userok;