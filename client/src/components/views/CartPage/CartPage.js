import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        let cartItems=[]
        //리덕스 user state에 cart안에 상품 있는지 체크
        // 있으면 불러옴.
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => { calculateTotal(response.payload) })
            }
        }
    },[props.user.userData])


    // 총 가격을 구함.
    // 할인가가 있으면 적용, 배송비는 상품에 대해서 1번만 적용.
    let calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map(item => {
            if(item.salePrice==0){
                total += parseInt(item.price, 10) * item.quantity + item.shippingFee
            } else {
                total += parseInt(item.salePrice, 10) * item.quantity + item.shippingFee
            }
        })
        setTotal(total)
        setShowTotal(true)
    }

    
    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(response => {
                if(response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }
            })
    }

    const transactionSuccess = (data) => {

        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
        .then(response => {
            if(response.payload.success) {
                setShowTotal(false)
                setShowSuccess(true)
            }
        })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>장바구니</h1>
            
            <div>
                <UserCardBlock product={props.user.cartDetail} removeItem={removeFromCart}/>
            </div>
            
            {ShowTotal ?
                <div style={{ marginTop: '3rem', float: "right" }}>
                    <h2>총 가격: {Total} 원</h2>
                    <Paypal total={Total} onSuccess={transactionSuccess}/>
                </div>
                : ShowSuccess ?
                    <Result 
                        status="success"
                        title="성공적으로 구매하셨습니다:)"
                    /> 
                    :
                    <Empty style={{ marginTop: '3rem'}} description={false}/>
            }
        </div>
    )
}

export default CartPage
