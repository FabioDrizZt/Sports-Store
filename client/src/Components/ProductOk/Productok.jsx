import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";
import './Productok.css'

function Productok() {
    return(
        <div className="ok">
            <div >
                <Result
                    icon={<CheckCircleTwoTone />}
                    title="Tu producto se guardó con éxito"
                    extra={<Link to={"/admin"}><Button type="primary">OK</Button></Link>}
                />
            </div>
        </div>
    )
}

export default Productok;