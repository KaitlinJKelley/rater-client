import React, { createContext, useState } from 'react'

const GameContext = createContext()

export const GameProvider = (props) => {

    const [games, setGames] = useState([])

    const getAllGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getGameById = gameId => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    return (
        <GameContext.Provider value={{ games, getAllGames, getGameById }} >
            { props.children }
        </GameContext.Provider>
    )
}