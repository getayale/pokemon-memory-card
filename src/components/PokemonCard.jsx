
function PokemonCard({ pokemon, onClick }) {
  const styles = {
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      padding: "22px",
      background: "linear-gradient(145deg, #1c2338, #252d49)",
      border: "1px solid #303a58",
      borderRadius: "18px",
      color: "#ffffff",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
    },
    image: {
      width: "100%",
      height: "160px",
      objectFit: "contain",
    },
    name: {
      textTransform: "capitalize",
      fontSize: "1.15rem",
      fontWeight: 700,
    },
  };

  return (
    <button
      type="button"
      style={styles.card}
      onClick={() => onClick(pokemon.id)}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={styles.image}
      />

      <h3 style={styles.name}>{pokemon.name}</h3>
    </button>
  );
}

export default PokemonCard;
