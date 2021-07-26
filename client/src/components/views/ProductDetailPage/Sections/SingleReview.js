import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import { useSelector } from 'react-redux'

import Axios from 'axios';

const { TextArea } = Input;

function SingleReview(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const [ReviewValue, setReviewValue] = useState("")
    const user = useSelector(state => state.user)

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    
    const onHandelChange = (e) => {
        setReviewValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: ReviewValue,
            writer: user.userData._id,
            productId: props.productId,
            responseTo: props.review._id
        }

        Axios.post('/api/review/saveReview', variables)
            .then(response => {
                if(response.data.success) {
                    props.refreshFunction(response.data.result)
                    setReviewValue("")
                } else {
                    alert('리뷰를 저장하지 못했습니다.')
                }
            })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">답변</span>
    ]

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.review.writer.name}
                avatar={<Avatar src={props.review.writer.image} alt/>}
                content={ <p>{ props.review.content }</p>}
            />


            {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea 
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={onHandelChange}
                    value={ReviewValue}
                    placeholder="형식적이지 않은 판매자님의 소중한 답변 부탁드립니다:)"
                />
                <br />
                <button style={{ width: "20%", height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
            }
        </div>
    )
}

export default SingleReview
