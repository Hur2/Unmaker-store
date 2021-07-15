import React, { useEffect, useState } from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config';
import { Icon, Col, Card, Row, Carousel  } from 'antd'
import Axios from 'axios';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
    }, [])

    const getProducts = (body) => {
        Axios.post("/api/product/products", body)
        .then(response => {
            if(response.data.success) {
                if(body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert("상품 불러오기 실패")
            }
        })
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        console.log(product)
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
            cover={<ImageSlider images={product.images}/>}
            >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col> 
    })


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2>베스트 상품 <Icon type="shopping" /> </h2>
            </div>

            <Row gutter={[16,16]}>
                {renderCards}
            </Row>

            {PostSize >= Limit &&
            <div style={{ justifyContent: 'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
            }
        </div>
    )
}

export default LandingPage
