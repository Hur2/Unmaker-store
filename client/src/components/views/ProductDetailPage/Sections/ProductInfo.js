import React from 'react';
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {
    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(addToCart(props.detail._id))
    }

    return (
        <div>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="구매수">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="방문자">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="제품 정보">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    장바구니 담기
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo