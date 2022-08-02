import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gamesListSelector, updateScore} from 'store/scoreBoardSlice';

import './UpdateScore.css';

const UpdateScore = () => {
    const games = useSelector(gamesListSelector);
    const dispatch = useDispatch();
    const liveGames = games.filter(({live}) => live);
    const liveGamesIds = liveGames.map(({id}) => id);
    const liveGamesIdsStr = liveGamesIds.join();
    const [selectedLiveGameId, setSelectedLiveGameId] = React.useState('');
    const selectedLiveGame = liveGames.find(({id}) => id === selectedLiveGameId);
    const homeTeamScoreRef = React.useRef();
    const awayTeamScoreRef = React.useRef();

    React.useEffect(() => {
        if (!liveGamesIds.includes(selectedLiveGameId)) {
            setSelectedLiveGameId('');
        }
    }, [liveGamesIdsStr]);

    const selectedLiveGameChangeHandler = (event) => {
        const value = event.target.value;

        setSelectedLiveGameId(value);
    };

    const applyNewScore = () => {
        const homeScore = parseInt(homeTeamScoreRef.current.value);
        const awayScore = parseInt(awayTeamScoreRef.current.value);

        dispatch(updateScore({gameId: selectedLiveGameId, homeScore, awayScore}));
    };

    return (
        <div className="update-score">
            <select value={selectedLiveGameId} onChange={selectedLiveGameChangeHandler}>
                <option value="">None</option>
                {liveGames.map(({id, homeTeam, homeScore, awayTeam, awayScore}) => (
                    <option key={id} value={id}>
                        {`${homeTeam} ${homeScore} - ${awayScore} - ${awayTeam}`}
                    </option>
                ))}
            </select>
            {selectedLiveGame && (
                <React.Fragment key={selectedLiveGameId}>
                    <input ref={homeTeamScoreRef} type="number" defaultValue={selectedLiveGame.homeScore} min={0} />
                    <input ref={awayTeamScoreRef} type="number" defaultValue={selectedLiveGame.awayScore} min={0} />
                    <button onClick={applyNewScore}>
                        Apply
                    </button>
                </React.Fragment>
            )}
        </div>
    );
};

export default UpdateScore;
