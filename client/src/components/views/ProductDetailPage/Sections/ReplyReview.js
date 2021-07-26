import React, { useEffect, useState } from 'react'
import SingleReview from './SingleReview'

function ReplyReview(props) {

    const [ReplyExistCheck, setReplyExistCheck] = useState(false)

    useEffect(() => {
        let reviewReplyCheck=false;

        props.reviewList.map((review, index) => {
            if(review.responseTo === props.parentReviewId){
                reviewReplyCheck=true
            }
        })
        setReplyExistCheck(reviewReplyCheck)
    })

    const renderReplyReview = (parentReviewId) =>
        props.reviewList.map((review, index) => (
            <React.Fragment>
                {review.responseTo === parentReviewId &&
                <SingleReview refreshFunction={props.refreshFunction} review={review} productId={props.productId}/>}
            </React.Fragment>
        ))

    return (
        <div>
            {ReplyExistCheck &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick>
                    판매자의 답변이 달렸습니다.
                </p>
            }
            {renderReplyReview(props.parentReviewId)}
        </div>
    )
}

export default ReplyReview
