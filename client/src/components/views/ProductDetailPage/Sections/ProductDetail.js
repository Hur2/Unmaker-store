import React from 'react'
import { Card } from 'antd';

function ProductDetail(props) {

    return (
        <div>
            <Card style={{ width: "100%" }}>
                <div dangerouslySetInnerHTML={{ __html: props.detail.detail }}></div>
            </Card>
        </div>
    )
}

export default ProductDetail
