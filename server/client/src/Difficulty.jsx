const Difficulty = ({ difficulties, onStartGame }) => {
    return (
      <div className="difficulty">
        <h3>Select Difficulty</h3>
        <div className="difficulty-buttons">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              className="difficulty-button"
              onClick={() => onStartGame}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
    );
}

export default Difficulty;