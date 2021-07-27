import React, { useEffect, useState } from 'react'
import SingleReview from './SingleReview'

function ReplyReview(props) {

    const [ReplyExistCheck, setReplyExistCheck] = useState(false)
    const [OpenReplyReview, setOpenReplyReview] = useState(false)

    useEffect(() => {
        let reviewReplyCheck=false;

        props.reviewList.map((review, index) => {
            if(review.responseTo === props.parentReviewId){
                reviewReplyCheck=true
            }
        })
        setReplyExistCheck(reviewReplyCheck)
    }, [props.reviewList])

    const renderReplyReview = (parentReviewId) =>
        props.reviewList.map((review, index) => (
            <React.Fragment key={index}>
                <div style={{ width: "80%", marginLeft: '40px' }}>
                {review.responseTo === parentReviewId &&
                    <SingleReview 
                        refreshFunction={props.refreshFunction} 
                        review={review} 
                        productId={props.productId}/>
                    }
                </div>
            </React.Fragment>
        ))

    const onHandleChange = () => {
        setOpenReplyReview(!OpenReplyReview)
    }

    return (
        <div>
            {ReplyExistCheck &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                    판매자의 답변이 달렸습니다.
                </p>
            }
            {OpenReplyReview &&
            renderReplyReview(props.parentReviewId)
            }
        </div>
    )
}

export default ReplyReview
