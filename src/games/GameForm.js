import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { GameContext } from './GameProvider'


export const GameForm = () => {
    const history = useHistory()
    const { getCategories, categories, createGame, updateGame, getGameById } = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        timeToPlay: 1,
        numberOfPlayers: 0,
        title: "",
        designer: "",
        minAge: 0,
        description: "",
        releaseYear: 2001,
        categories: []
    })

    const [categoryNames, setCategoryNames] = useState([])

    const {gameId} = useParams()

    useEffect(() => {
        getCategories()
        if (gameId) {
            getGameById(gameId)
            .then(game => {
                let gameToEdit = {...currentGame}

                gameToEdit.id = game.id
                gameToEdit.timeToPlay = game.time_to_play
                gameToEdit.numberOfPlayers = game.num_of_players
                gameToEdit.title = game.title
                gameToEdit.designer = game.designer
                gameToEdit.minAge = game.min_age

                setCurrentGame(gameToEdit)
            })
        }
    }, [])

    const removeCategory = (event) => {
        event.preventDefault()
        let newGameState = {...currentGame}
        let newCatNames = [...categoryNames]

        categories.forEach(catObj => {
            if(event.target.value == catObj.label) {

                newCatNames.splice(newCatNames.indexOf(event.target.value), 1)
                setCategoryNames(newCatNames)

                newGameState.categories.splice(newGameState.categories.indexOf(catObj.id), 1)
                setCurrentGame(newGameState)
            }
        })
    }

    const handleInputChange = (event) => {
        const newGameState = { ...currentGame }
        const newCatNames = [...categoryNames]
        if(event.target.name == "categories") {
            if(newGameState.categories.includes(parseInt(event.target.value)) == false) {
                newGameState[event.target.name].push(parseInt(event.target.value))
                setCurrentGame(newGameState)
            }

            categories.forEach(cat => {
                if(newCatNames.includes(cat.label) == false) {
                    if(cat.id == event.target.value) {
                        newCatNames.push(cat.label)
                    }
                }
            })
            setCategoryNames(newCatNames)
        } 
        else{
            newGameState[event.target.name] = event.target.value
            setCurrentGame(newGameState)
        }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title} 
                        onChange={handleInputChange} 
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Gamer Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description of Game: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="releaseYear">Release Year: </label>
                    <input type="text" name="releaseYear" required autoFocus className="form-control"
                        value={currentGame.releaseYear}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="timeToPlay">Time to Play One Round (in minutes):</label>
                <input type="text" name="timeToPlay" required autoFocus className="form-control"
                        value={currentGame.timeToPlay}
                        onChange={handleInputChange}
                    />
            </fieldset>
            <fieldset>
                <label htmlFor="minAge">Minimum Age:</label>
                <input type="text" name="minAge" required autoFocus className="form-control"
                        value={currentGame.minAge}
                        onChange={handleInputChange}
                    />
            </fieldset>
            <fieldset>
                <label htmlFor="categories">Categories:</label>
                <section>
                    {categoryNames.map((cat) => {
                        return <button key={`${cat}`} value={`${cat}`} onClick={removeCategory}>X{cat}</button>
                    })}
                </section>
                <select value="0" name="categories" onChange={handleInputChange}>
                    <option value="0">Add a Category</option>
                    {categories.map(gt => <option id={`${gt.label}`}key={`${gt.id}`} value={`${gt.id}`}>{`${gt.label}`}</option>)}
                </select>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // Send POST request to your API
                    {gameId ? updateGame(currentGame)
                        .then(() => history.push("/games")) :
                        createGame(currentGame)
                        .then(() => history.push("/games"))
                    }
                    
                }}
                className="btn btn-primary">{gameId ? "Save" : "Create"}</button>
        </form>
    )
}