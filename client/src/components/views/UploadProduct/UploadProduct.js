import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import TextEditer from './Sections/TextEditer';
import Axios from 'axios';

const { TextArea } = Input;

const Continents = [
    { ket: 1, value: "가구/인테리어" },
    { ket: 2, value: "도서" },
    { ket: 3, value: "디지털/가전" },
    { ket: 4, value: "생활/건강" },
    { ket: 5, value: "스포츠/레저" },
    { ket: 6, value: "식품" },
    { ket: 7, value: "여가/생활편의" },
    { ket: 8, value: "출산/육아" },
    { ket: 9, value: "패션의류" },
    { ket: 10, value: "패션잡화" },
    { ket: 11, value: "화장품/미용" }
]

function UploadProduct(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(!Title || !Description || !Price || !Continent || !Images) {
            return alert("모든 값을 넣어주셔야 합니다.")
        }

        const body = {
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
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

            <label>썸네일</label>
            <FileUpload refreshFunction={updateImages}/>
            <p>300x240(px)을 권장합니다.</p>
            
            <Form onSubmit={submitHandler}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                </div>

                <br />
                <br />
                <label>이름</label>
                <Input 
                    onChange={titleChangeHandler}
                    value={Title}
                />

                <br />
                <br />
                <label>설명</label>
                <TextArea
                    onChange={descriptionChangeHandler}
                    value={Description}
                />

                <br />
                <br />
                <label>가격($)</label>
                <Input
                    type="number"
                    min="0"
                    onChange={priceChangeHandler}
                    value={Price}
                />

                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map((item, index) => (
                        <option key={index} value={item.key}>{item.value}</option>
                     ))}
                </select>
                <br />
                <br />

                <TextEditer />
                <br />
                <br />

                <Button htmlType="submit" size="large" >
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProduct

