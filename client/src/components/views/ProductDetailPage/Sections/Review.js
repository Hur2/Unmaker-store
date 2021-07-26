import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleReview from './SingleReview'
import ReplyReview from './ReplyReview'

function Review(props) {

    const [ReviewValue, setReviewValue] = useState("")
    const user = useSelector(state => state.user)

    const handleClick = e => {
        setReviewValue(e.currentTarget.value)
    }

    const onSubmit = e => {
        e.preventDefault();

        const variables = {
            content: ReviewValue,
            writer: user.userData._id,
            productId: props.productId
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

    return (
        <div>
            <br />
            <p>리뷰</p>
            <hr />

            {/* 리뷰 출력 */}

            {props.reviewList && props.reviewList.map((review, index) => (
                (!review.responseTo &&
                    <React.Fragment key={index}>
                        <SingleReview refreshFunction={props.refreshFunction} review={review} productId={props.productId} />
                        <ReplyReview reviewList={props.reviewList} refreshFunction={props.refreshFunction} parentReviewId={review._id}/>
                    </React.Fragment>
                )
            ))}

            {/* 리뷰 쓰는 영역 */
            //리뷰는 결제한 사람만 쓸 수 있음.
            //결제한 사람도 한번만 쓸 수 있음.
            }
            
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea 
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={ReviewValue}
                    placeholder="제품에 대한 솔직한 리뷰를 남겨주세요:)"
                />
                <br />
                <button style={{ width: "20%", height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>

        </div>
    )
}

export default Review
