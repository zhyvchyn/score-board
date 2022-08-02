import React from 'react';
import {useSelector} from 'react-redux';
import {gamesListSelector} from 'store/scoreBoardSlice';

import './ScoreBoard.css';

const ScoreBoard = () => {
    const games = useSelector(gamesListSelector);
    const sortedGames = [...games].sort((gameA, gameB) => {
        const scoreGameA = gameA.homeScore + gameA.awayScore;
        const scoreGameB = gameB.homeScore + gameB.awayScore;

        if (scoreGameA === scoreGameB) {
            return gameB.startTime - gameA.startTime;
        } else {
            return scoreGameB - scoreGameA;
        }
    });

    return (
        <ul className="score-board">
            {sortedGames.map(({id, homeTeam, homeScore, awayTeam, awayScore, live}) => (
                <li key={id} className={live ? 'live' : ''}>
                    {`${live ? 'LIVE: ' : ''}${homeTeam} ${homeScore} - ${awayScore} - ${awayTeam}`}
                </li>
            ))}
        </ul>
    );
};

export default ScoreBoard;
