import React, { useEffect, useState } from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config';
import { Icon, Col, Card, Row, Carousel  } from 'antd'
import Axios from 'axios';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState('')

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
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
            >
                <Meta 
                    title={product.title}
                    description={`${product.price}천원`}
                />
            </Card>
        </Col> 
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price
        let array = [];

        for (let key in data) {
            if (data[key]._id == parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }
        newFilters[category] = filters
        
        if(category == "price") {
            let priceValues = handlePrice(filters)
            newFilters["price"] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm)
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        getProducts(body)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2>베스트 상품 <Icon type="shopping" /> </h2>
            </div>

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature  refreshFunction={updateSearchTerm}/>
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
