import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addGame, gamesListSelector} from 'store/scoreBoardSlice';
import teams from 'teams';

import './AddGame.css';

const AddGame = () => {
    const games = useSelector(gamesListSelector);
    const dispatch = useDispatch();
    const liveGamesTeams = games.map(({homeTeam, awayTeam}) => [homeTeam, awayTeam]).flat();
    const availableTeams = teams.filter((team) => !liveGamesTeams.includes(team));
    const [homeTeam, setHomeTeam] = React.useState('');
    const [awayTeam, setAwayTeam] = React.useState('');

    const homeTeamChangeHandler = (event) => {
        const value = event.target.value ?? '';

        setHomeTeam(value);
    };

    const awayTeamChangeHandler = (event) => {
        const value = event.target.value ?? '';

        setAwayTeam(value);
    };

    const startGameHandler = () => {
        dispatch(addGame({homeTeam, awayTeam}));

        setHomeTeam('');
        setAwayTeam('');
    };

    return (
        <div className="add-game">
            <select value={homeTeam} onChange={homeTeamChangeHandler}>
                <option value="">None</option>
                {availableTeams.filter((team) => team !== awayTeam).map((team) => (
                    <option key={team} value={team}>
                        {team}
                    </option>
                ))}
            </select>
            <select value={awayTeam} onChange={awayTeamChangeHandler}>
                <option value="">None</option>
                {availableTeams.filter((team) => team !== homeTeam).map((team) => (
                    <option key={team} value={team}>
                        {team}
                    </option>
                ))}
            </select>
            <button onClick={startGameHandler} disabled={!homeTeam || !awayTeam}>
                Start match
            </button>
        </div>
    );
};

export default AddGame;
