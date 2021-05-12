import React from "react"
import { Route } from "react-router-dom"
import { GameDetail } from "./games/GameDetail"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            {<GameProvider>
                <Route exact path = "/games">
                    <GameList/>
                </Route>
                <Route exact path = "/games/:gameId(\d+)">
                    <GameDetail/>
                </Route>
            </GameProvider>
            }
        </main>
    </>
}