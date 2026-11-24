
function Header() {
  const styles = {
    header: {
      position: "relative",
      textAlign: "center",
      marginBottom: "45px",
      padding: "45px 25px",
      background: "linear-gradient(135deg, #1c2338, #252d49)",
      border: "1px solid #303a58",
      borderRadius: "24px",
      overflow: "hidden",
    },
    content: {
      position: "relative",
      zIndex: 1,
    },
    label: {
      display: "inline-block",
      color: "#facc15",
      fontSize: "0.75rem",
      fontWeight: 800,
      letterSpacing: "3px",
      marginBottom: "18px",
    },
    title: {
      fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
      fontWeight: 900,
      color: "#ffffff",
      letterSpacing: "-1.5px",
      lineHeight: 1.15,
      marginBottom: "18px",
    },
    titleHighlight: {
      color: "#facc15",
    },
    description: {
      color: "#b8bfd3",
      fontSize: "1.05rem",
      lineHeight: 1.8,
      maxWidth: "600px",
      margin: "0 auto",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.content}>
        <span style={styles.label}>POKÉMON CHALLENGE</span>

        <h1 style={styles.title}>
          Pokémon <span style={styles.titleHighlight}>Memory Game</span>
        </h1>

        <p style={styles.description}>
          Test your memory and catch them all!
          Click each Pokémon once. Don't choose the same Pokémon twice!
        </p>
      </div>
    </header>
  );
}

export default Header;
