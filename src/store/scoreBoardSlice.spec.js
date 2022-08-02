import scoreBoardReducer, {addGame, finishGame, updateScore} from './scoreBoardSlice';

describe('counter reducer', () => {
    const initialState = {
        games: []
    };

    it('should handle initial state', () => {
        expect(scoreBoardReducer(undefined, {type: 'unknown'})).toEqual({
            games: []
        });
    });

    it('should handle add game', () => {
        const actual = scoreBoardReducer(initialState, addGame({homeTeam: 'Home', awayTeam: 'Away'}));
        expect(actual.games.length).toEqual(1);
    });

    it('should handle updated score', () => {
        const state = {
            games: [{
                id: 1,
                homeTeam: 'Home',
                homeScore: 0,
                awayTeam: 'Home',
                awayScore: 0,
                startTime: Date.now(),
                live: true
            }]
        };

        const actual = scoreBoardReducer(state, updateScore({gameId: 1, homeScore: 1, awayScore: 0}));
        expect(actual.games[0].homeScore).toEqual(1);
    });

    it('should handle incrementByAmount', () => {
        const state = {
            games: [{
                id: 1,
                homeTeam: 'Home',
                homeScore: 0,
                awayTeam: 'Home',
                awayScore: 0,
                startTime: Date.now(),
                live: true
            }]
        };
        const actual = scoreBoardReducer(state, finishGame({gameId: 1}));
        expect(actual.games[0].live).toEqual(false);
    });
});
