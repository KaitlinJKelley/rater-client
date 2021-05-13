import React, { createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = (props) => {

    const [games, setGames] = useState([])
    const [categories, setCategories] = useState([])

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

    const createGame = (game) => {
        return fetch(`http://localhost:8000/games`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(response => response.json())
            .then(getAllGames)
    }

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    return (
        <GameContext.Provider value={{ games, getAllGames, getGameById, createGame, getCategories, categories, setCategories }} >
            { props.children }
        </GameContext.Provider>
    )
}