import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import TextEditer from './Sections/TextEditer';
import Axios from 'axios';

const { TextArea } = Input;

const Continents = [
    { key: 1, value: "가구/인테리어" },
    { key: 2, value: "도서" },
    { key: 3, value: "디지털/가전" },
    { key: 4, value: "생활/건강" },
    { key: 5, value: "스포츠/레저" },
    { key: 6, value: "식품" },
    { key: 7, value: "여가/생활편의" },
    { key: 8, value: "출산/육아" },
    { key: 9, value: "패션의류" },
    { key: 10, value: "패션잡화" },
    { key: 11, value: "화장품/미용" }
]

function UploadProduct(props) {

    const [Title, setTitle] = useState("")
    const [Price, setPrice] = useState(0)
    const [SalePrice, setSalePrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [ShippingFee, setShippingFee] = useState(0)
    const [Images, setImages] = useState([])
    const [Detail, setDetail] = useState("")

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const salePriceChangeHandler = (event) => {
        setSalePrice(event.currentTarget.value)
    }

    const shippingFeeChangeHandler = (event) => {
        setShippingFee(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const detailChangeHandler = (data) => {
        setDetail(data)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(!Title) {
            return alert("상품명을 입력하셔야 합니다.")
        } else if(!Continent) {
            return alert("카테고리를 선택하셔야 합니다.")
        } else if(!Price) {
            return alert("가격을 입력하셔야 합니다.")
        } else if(!Detail) {
            return alert("상세설명을 작성하셔야 합니다.")
        }

        const body = {
            writer: props.user.userData._id,
            title: Title,
            price: Price,
            salePrice: SalePrice,
            images: Images,
            continents: Continent,
            detail: Detail,
            shippingFee: ShippingFee
        }

        Axios.post('/api/product/', body)
            .then(response => {
                if(response.data.success) {
                    alert("성공적으로 상품 등록을 하였습니다.")
                    props.history.push("/")
                } else {
                    alert("상품 등록에 실패 했습니다.")
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', justifyContent: '2rem' }}>
                <h2> 상품 등록 </h2>
            </div>
            <br/>

            <label><strong>썸네일</strong></label>
            <FileUpload refreshFunction={updateImages}/>
            <p>300x240(px)을 권장합니다.</p>
            
            <Form onSubmit={submitHandler}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                </div>

                <br />
                <br />
                <hr />
                <br />
                <label><strong>상품명</strong></label>
                <Input 
                    onChange={titleChangeHandler}
                    value={Title}
                />
                <br />
                <br />
                <hr />
                <br />

                <label><strong>카테고리</strong></label>
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map((item, index) => (
                        <option key={index} value={item.key}>{item.value}</option>
                     ))}
                </select>
                <br />
                <br />
                <hr />
                <br />

                <label><strong>가격(₩)</strong></label>
                <Input
                    type="number"
                    min="0"
                    onChange={priceChangeHandler}
                    value={Price}
                />
                <br />
                <br />

                <label><strong>할인가격(₩)</strong></label>
                <Input
                    type="number"
                    min="0"
                    onChange={salePriceChangeHandler}
                    value={SalePrice}
                />

                <br />
                <br />
                <label><strong>배송비</strong></label>
                <Input
                    type="number"
                    min="0"
                    onChange={shippingFeeChangeHandler}
                    value={ShippingFee}
                />

                <br />
                <br />
                <hr />
                <br />

                <label><strong>상세설명</strong></label>
                <TextEditer onChangefunction={detailChangeHandler}/>
                <br />
                <br />

                <br />
                <br />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button htmlType="submit" size="large" >
                        확인
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default UploadProduct

