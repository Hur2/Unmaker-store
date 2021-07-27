import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import ProductDetail from './Sections/ProductDetail';
import Review from './Sections/Review';
import { continents } from '../LandingPage/Sections/Datas';
import { Col, Row } from 'antd'

function ProductDetailPage(props) {

    const productId = props.match.params.productId;
    const variable = { productId: productId }

    const [Product, setProduct] = useState({})
    const [Reviews, setReviews] = useState([])

    useEffect(() => {
        Axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))

        Axios.post(`/api/review/getReviews`, variable)
            .then(response => {
                if(response.data.success) {
                    setReviews(response.data.reviews)
                } else {
                    alert("리뷰를 불러오는 것을 실패하였습니다.")
                }
            })
    }, [])

    const refreshFunction = (newReview) => {
        setReviews(Reviews.concat(newReview))
    }

    return (
        <div style={{ width: '50%', margin: '3rem auto'}}>
            <div>
                {continents.map(item => {
                    if(item._id == Product.continents){
                        return item.name
                    }
                })}
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

            <hr />
            <p>상품 상세</p>
            <ProductDetail detail={Product}/>

            <Review refreshFunction={refreshFunction} reviewList={Reviews} productId={productId} detail={Product}/>
        </div>
    )
}

export default ProductDetailPage
