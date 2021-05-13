import React, { createContext, useState } from 'react'

export const ReviewContext = createContext()

export const ReviewProvider = props => {

    const createReview = review => {
        return fetch(`http://localhost:8000/reviews`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(response => response.json())
            // .then(getGameReviews)
    }

    return (
        <ReviewContext.Provider value={{ createReview }} >
            { props.children }
        </ReviewContext.Provider>
    )
}