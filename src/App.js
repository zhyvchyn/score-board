import ScoreBoard from 'ScoreBoard';
import AddGame from 'AddGame';
import UpdateScore from 'UpdateScore';
import FinishGame from 'FinishGame';

import './App.css';

function App() {
    return (
        <div className="app">
            <ScoreBoard />
            <AddGame />
            <UpdateScore />
            <FinishGame />
        </div>
    );
}

export default App;
