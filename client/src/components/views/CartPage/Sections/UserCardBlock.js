import React from 'react'
import "./UserCardBlock.css";

function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`;
        }
    }

    const renderItems = () => (
        props.product && props.product.map((product,index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} alt="product"
                    src={renderCartImage(product.images)}/>
                </td>
                <td>
                    {product.quantity} 개
                </td>
                <td>
                    {product.salePrice ? product.salePrice : product.price} 원
                </td>
                <td>
                    <button onClick={() => props.removeItem(product._id)}>
                        취소
                    </button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품 수량</th>
                        <th>상품 가격</th>
                        <th>장바구니 취소</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
