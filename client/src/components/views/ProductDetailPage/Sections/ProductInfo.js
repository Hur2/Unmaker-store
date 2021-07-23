import React, { useState } from 'react';
import { Button, Descriptions, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) { 

    const [Quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(addToCart(props.detail._id, Quantity))
    }

    const quantityChangeHandler = (e) => {
        setQuantity(e.currentTarget.value)
    }


    //여기에는 ','삽입이 적용이 안됨. 오류남. 일단은 보류.
    return (
        <div>
            <Descriptions title="상품 정보" bordered>
                <Descriptions.Item label="상품명" span={3}>{props.detail.title}</Descriptions.Item>
                <Descriptions.Item label="가격" span={3}>
                    {props.detail.salePrice == 0 ? 
                    `${props.detail.price}원` :
                    (<b><strike>{props.detail.price}</strike> =&gt; {props.detail.salePrice}원</b>)
                    }
                </Descriptions.Item>
                <Descriptions.Item label="택배비" span={3}>{props.detail.shippingFee}원</Descriptions.Item>
                <Descriptions.Item label="판매자" span={3}>{props.detail.writer && props.detail.writer.name}</Descriptions.Item>
                <Descriptions.Item label="구매수" span={3}>{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="방문자" span={3}>{props.detail.views}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                수량:&nbsp;
                <Input
                    style={{ width: '12%' }}
                    type="number"
                    min="1"
                    onChange={quantityChangeHandler}
                    value={Quantity}
                />
            </div>
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
