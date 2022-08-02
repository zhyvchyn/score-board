import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    games: []
};

const scoreBoardSlice = createSlice({
    name: 'scoreBoard',
    initialState,
    reducers: {
        addGame: (state, action) => {
            const {homeTeam, awayTeam} = action.payload;
            const startTime = Date.now();

            state.games.push({
                id: `${startTime}`,
                startTime,
                homeTeam,
                homeScore: 0,
                awayTeam,
                awayScore: 0,
                live: true
            });
        },
        updateScore: (state, action) => {
            const {gameId, homeScore, awayScore} = action.payload;

            state.games.forEach((game) => {
                if (game.id === gameId) {
                    game.homeScore = homeScore;
                    game.awayScore = awayScore;
                }
            });
        },
        finishGame: (state, action) => {
            const {gameId} = action.payload;

            state.games.forEach((game) => {
                if (game.id === gameId) {
                    game.live = false;
                }
            });
        }
    },
    extraReducers: {}
});

export const {addGame, updateScore, finishGame} = scoreBoardSlice.actions;

export const gamesListSelector = (state) => state.scoreBoard.games;

export default scoreBoardSlice.reducer;
