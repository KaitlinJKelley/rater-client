import React from "react"
import { Route } from "react-router-dom"
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
            </GameProvider>
            }
        </main>
    </>
}