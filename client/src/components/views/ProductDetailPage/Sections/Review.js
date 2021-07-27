import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SingleReview from './SingleReview'
import ReplyReview from './ReplyReview'

function Review(props) {

    const [ReviewValue, setReviewValue] = useState("")
    const [ReviewAvaible, setReviewAvaible] = useState(false)
    const [ReplyAvaiable, setReplyAvaiable] = useState(false)
    const user = useSelector(state => state.user)

    useEffect(() => {
        let check = true;
        if(user.userData && user.userData.history) {
            user.userData.history.map((item, i) => {
                if(props.detail.title === item.name) {
                    console.log(props.reviewList)
                    props.reviewList.map((review, index) => {
                        if(review.writer._id === user.userData._id) {
                            check=false;
                        }
                    })
                    if (check) {
                        setReviewAvaible(true) 
                    }
                }
            })
        }
    },[props.reviewList])

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
                    setReviewAvaible(false)
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
                        <SingleReview replyAvaiable={ReplyAvaiable} refreshFunction={props.refreshFunction} detail={props.detail} review={review} productId={props.productId} />
                        <ReplyReview reviewList={props.reviewList} refreshFunction={props.refreshFunction} parentReviewId={review._id}/>
                    </React.Fragment>
                )
            ))}

            {/* 리뷰 쓰는 영역 */
            //리뷰는 결제한 사람만 쓸 수 있음.
            //결제한 사람도 한번만 쓸 수 있음.
            }
            
            {ReviewAvaible &&
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
            }

        </div>
    )
}

export default Review
