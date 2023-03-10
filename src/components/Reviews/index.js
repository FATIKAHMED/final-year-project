import React from "react";
import ReviewUnit from "components/Review_Unit";
import { Divider } from "@material-ui/core";
import isEmpty from "utils/is-empty";

const Reviews = (props) => {

  return (
    <>
      {props.reviews.slice(0, props.count).map((review) => {
        if (isEmpty(review.content))
          return null
        else
          return (
            <div style={{ marginBottom: "2rem" }} key={review?.content}>
              <ReviewUnit data={review} />
              {review.response &&
                (<div style={{ marginLeft: "3rem" }}>
                  <ReviewUnit data={review.response} />
                </div>)}
              {/* <Divider style={{ margin: "1rem 0" }} /> */}
            </div>
          );
      })}
    </>
  );
};

export default Reviews;
