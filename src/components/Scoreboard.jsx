
function Scoreboard({ score, bestScore }) {
  const styles = {
    scoreboard: {
      display: "flex",
      justifyContent: "center",
      gap: "25px",
      marginBottom: "35px",
    },
    scoreBox: {
      background: "#1c2338",
      border: "1px solid #303a58",
      borderRadius: "14px",
      padding: "20px 40px",
      minWidth: "180px",
      textAlign: "center",
    },
    heading: {
      color: "#b8bfd3",
      fontSize: "0.95rem",
      marginBottom: "10px",
    },
    score: {
      color: "#facc15",
      fontSize: "2rem",
      fontWeight: 800,
    },
  };

  return (
    <section style={styles.scoreboard}>
      <div style={styles.scoreBox}>
        <h2 style={styles.heading}>Current Score</h2>
        <p style={styles.score}>{score}</p>
      </div>

      <div style={styles.scoreBox}>
        <h2 style={styles.heading}>Best Score</h2>
        <p style={styles.score}>{bestScore}</p>
      </div>
    </section>
  );
}

export default Scoreboard;
