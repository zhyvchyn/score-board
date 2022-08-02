import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {finishGame, gamesListSelector} from 'store/scoreBoardSlice';

import './FinishGame.css';

const FinishGame = () => {
    const games = useSelector(gamesListSelector);
    const dispatch = useDispatch();
    const liveGames = games.filter(({live}) => live);
    const liveGamesIds = liveGames.map(({id}) => id);
    const liveGamesIdsStr = liveGamesIds.join();
    const [selectedLiveGameId, setSelectedLiveGameId] = React.useState('');

    React.useEffect(() => {
        if (!liveGamesIds.includes(selectedLiveGameId)) {
            setSelectedLiveGameId('');
        }
    }, [liveGamesIdsStr]);

    const selectedLiveGameChangeHandler = (event) => {
        const value = event.target.value;

        setSelectedLiveGameId(value);
    };

    const finishGameHandler = () => {
        dispatch(finishGame({gameId: selectedLiveGameId}));
    };

    return (
        <div className="finish-game">
            <select value={selectedLiveGameId} onChange={selectedLiveGameChangeHandler}>
                <option value="">None</option>
                {liveGames.map(({id, homeTeam, homeScore, awayTeam, awayScore}) => (
                    <option key={id} value={id}>
                        {`${homeTeam} ${homeScore} - ${awayScore} - ${awayTeam}`}
                    </option>
                ))}
            </select>
            <button onClick={finishGameHandler} disabled={!selectedLiveGameId}>
                Finish
            </button>
        </div>
    );
};

export default FinishGame;
