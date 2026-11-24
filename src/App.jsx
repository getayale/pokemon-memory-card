
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import Scoreboard from "./components/Scoreboard";
import { useState, useEffect } from "react";

import {
  fetchPokemonList,
  fetchPokemonDetails,
} from "./services/pokemonService";

// Shuffle Pokémon cards
function shufflePokemon(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

function App() {
  // Game states
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonIds, setSelectedPokemonIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inline styles
  const styles = {
    app: {
      width: "min(1400px, 94%)",
      margin: "0 auto",
      padding: "40px 0",
    },
    pokemonGrid: {
      display: "grid",
      width: "100%",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "24px",
      marginTop: "35px",
    },
    gameOver: {
      textAlign: "center",
      padding: "30px 20px",
      marginBottom: "30px",
      background: "linear-gradient(135deg, #252d49, #1c2338)",
      border: "1px solid #facc15",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
    },
    gameOverTitle: {
      color: "#facc15",
      fontSize: "2rem",
      fontWeight: 900,
      marginBottom: "10px",
    },
    gameOverText: {
      color: "#b8bfd3",
      fontSize: "1.05rem",
      marginBottom: "22px",
    },
    restartButton: {
      background: "#facc15",
      color: "#101322",
      border: "none",
      borderRadius: "10px",
      padding: "13px 28px",
      fontSize: "1rem",
      fontWeight: 800,
      cursor: "pointer",
    },
    loadingMessage: {
      gridColumn: "1 / -1",
      textAlign: "center",
      padding: "30px",
      fontSize: "1.1rem",
      color: "#facc15",
    },
    errorMessage: {
      gridColumn: "1 / -1",
      textAlign: "center",
      padding: "30px",
      fontSize: "1.1rem",
      color: "#f87171",
    },
  };

  // Handle Pokémon card clicks
  function handleCardClick(pokemonId) {
    if (gameOver) return;

    // Check whether the Pokémon was already selected
    if (selectedPokemonIds.includes(pokemonId)) {
      setGameOver(true);
      return;
    }

    // Add selected Pokémon ID
    setSelectedPokemonIds((previousIds) => [
      ...previousIds,
      pokemonId,
    ]);

    // Increase current score
    setScore((previousScore) => {
      const newScore = previousScore + 1;

      // Update best score
      setBestScore((previousBest) =>
        Math.max(previousBest, newScore)
      );

      return newScore;
    });

    // Shuffle Pokémon cards
    setPokemonList((previousList) =>
      shufflePokemon(previousList)
    );
  }

  // Restart the game
  function handleRestart() {
    setScore(0);
    setSelectedPokemonIds([]);
    setGameOver(false);

    setPokemonList((previousList) =>
      shufflePokemon(previousList)
    );
  }

  // Fetch Pokémon data
  useEffect(() => {
    async function loadPokemon() {
      try {
        setIsLoading(true);
        setError(null);

        const pokemon = await fetchPokemonList();

        const pokemonDetails = await Promise.all(
          pokemon.map((item) => fetchPokemonDetails(item.url))
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPokemon();
  }, []);

  return (
    <div style={styles.app}>
      {/* Game header */}
      <Header />

      {/* Scoreboard */}
      <Scoreboard
        score={score}
        bestScore={bestScore}
      />

      {/* Game over section */}
      {gameOver && (
        <div style={styles.gameOver}>
          <h2 style={styles.gameOverTitle}>
            Game Over!
          </h2>

          <p style={styles.gameOverText}>
            You scored {score} points!
          </p>

          <button
            type="button"
            style={styles.restartButton}
            onClick={handleRestart}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Pokémon cards */}
      <div style={styles.pokemonGrid}>
        {isLoading && (
          <p style={styles.loadingMessage}>
            Loading Pokémon...
          </p>
        )}

        {error && (
          <p style={styles.errorMessage}>
            Error: {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            {pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handleCardClick}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
