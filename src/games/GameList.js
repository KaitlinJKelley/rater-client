import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { GameContext } from './GameProvider'

export const GameList = () => {
    const {getAllGames, games} = useContext(GameContext)

    const history = useHistory()

    useEffect(() => {
        getAllGames()
    }, [])

    return (
        <article className="games">
            <button onClick={() => {history.push(`/games/new`)}} className="btn btn-2 btn-sep icon-create"
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">
                        <Link to={`/games/${game.id}`}>{game.title}</Link>
                        </div>
                       
                    </section>
                })
            }
        </article>
    )
}
