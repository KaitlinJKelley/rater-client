import React, { useContext, useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings'
import { useParams } from 'react-router'
import { ReviewContext } from '../reviews/ReviewProvider'
import { GameContext } from './GameProvider'

export const GameDetail = () => {
    const {gameId} = useParams()

    const {getGameById} = useContext(GameContext)
    const {createReview} = useContext(ReviewContext)

    const [reviewGameClicked, setReviewGameClicked] = useState(false)
    const [game, setGame] = useState({})
    const [review, setReview] = useState({
        text: "",
        rating: 0,
        gameId: 0
    })

    useEffect(() => {
        getGameById(gameId)
        .then(setGame)
    }, [])

    useEffect(() => {
        averageStars()
    }, [game])

    const handleChange = event => {
        const newReview = {...review}
        newReview[event.target.name] = event.target.value
        setReview(newReview)
    }

    const changeRating = rating => {
        const newReview = {...review}
        newReview.rating = rating
        setReview(newReview)
    } 

    const handleSave = (event) => {
        event.preventDefault()
        const newReview = {...review}
        newReview.gameId = game.id
        setReview(newReview)
        createReview(newReview)

        setReviewGameClicked(false)
    }

    const averageStars = (rating) => {
        let stars = ["☆","☆","☆","☆","☆"]
        for(let i = 0; i < 5; i++){
            if(rating >= 1){
                stars[i] = "⭐️"
            }
        }
        return stars
    }

    return(
        <article className="gameCard">
            <h2>{game.title}</h2>
            <p><b>By:</b> {game.designer}</p>
            <p><b>Release Year:</b> {game.release_year}</p>
            <p><b>Number of Players:</b> {game.num_of_players}</p>
            <p><b>Est. Time per Round:</b> {game.time_to_play} minutes</p>
            <p><b>Recommended Ages:</b> {game.min_age}</p>
            <p><b>Categories:</b> {game.categories?.map(cat => <li key={Math.random()}>{cat.label}</li>)}</p>
            <p>Average Rating: {averageStars(game.average_rating)} {game.average_rating?.toFixed(2)} out of 5</p>
            <button onClick={() => setReviewGameClicked(true)}>Review Game</button>
            {reviewGameClicked && 
                <form>
                    <fieldset>
                        <textarea style={{ width: "60%", height: "80px"}} name="text" value={`${review.text}`} onChange={handleChange} placeholder={`Tell everyone what you think of ${game.title}`}></textarea>
                    </fieldset>
                    <StarRatings 
                        rating={review.rating}
                        changeRating={changeRating}
                        starRatedColor="rgb(230,230,0)"
                        starHoverColor="rgb(230,230,0)"
                        numberOfStars={5}
                        name='rating'
                    />
                    <button type="submit" onClick={handleSave}>Save</button>
                </form>
            }
            <h3>Reviews</h3>
            {game.reviews?.map(review => {
                return <article>
                    <p>{review.text}</p>
                    <p>{averageStars(review.rating)}</p>
                    <p>- {review.reviewer.user.first_name} {review.reviewer.user.last_name} {review.date_created}</p>
                </article>
            })}
        </article>
    )
}
