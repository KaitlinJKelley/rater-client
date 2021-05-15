import React from "react"
import { Route } from "react-router-dom"
import { GameDetail } from "./games/GameDetail"
import { GameForm } from "./games/GameForm"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"
import { ReviewProvider } from "./reviews/ReviewProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            {<GameProvider>
                <ReviewProvider>
                    <Route exact path = "/games">
                        <GameList/>
                    </Route>
                    <Route exact path = "/games/:gameId(\d+)">
                        <GameDetail/>
                    </Route>
                    <Route exact path = "/games/edit/:gameId(\d+)">
                        <GameForm />
                    </Route>
                    <Route exact path = "/games/new">
                        <GameForm/>
                    </Route>
                </ReviewProvider>
            </GameProvider>
            }
        </main>
    </>
}