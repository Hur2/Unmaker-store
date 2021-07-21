import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Col, Row } from 'antd'

function ProductDetailPage(props) {

    const productId = props.match.params.productId;

    const [Product, setProduct] = useState({})

    useEffect(() => {
        Axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    }, [])

    return (
        <div style={{ width: '100%', padding: '3rem 4rem'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            {/*이미지 / 정보 / 상세페이지 총 3가지 컴포넌트 추가 예정*/}

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={Product}/>
                </Col>
            </Row>

        </div>
    )
}

export default ProductDetailPage
