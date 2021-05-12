import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GameContext } from './GameProvider'

export const GameDetail = () => {
    const {gameId} = useParams()

    const {getGameById} = useContext(GameContext)

    const [game, setGame] = useState({})

    useEffect(() => {
        getGameById(gameId)
        .then(setGame)
    }, [])

    return(
        <article className="gameCard">
            <h2>{game.title}</h2>
            <p><b>By:</b> {game.designer}</p>
            <p><b>Release Year:</b> {game.release_year}</p>
            <p><b>Number of Players:</b> {game.num_of_players}</p>
            <p><b>Est. Time per Round:</b> {game.time_to_play} minutes</p>
            <p><b>Recommended Ages:</b> {game.min_age}</p>
            <p><b>Category:</b> {game.category}</p>
        </article>
    )
}
