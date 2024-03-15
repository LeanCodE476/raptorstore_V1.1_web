
const Header = () => {
  return (
    <header
      style={{
   
        top: "0",
        width: "100%",
        height: "4rem",
        lineHeight: "4rem",
        fontSize: "1rem",
        zIndex: "9",
        color: "#FF0000",
        borderBottom: "1px solid #FF0000",
      }}
    >
      <h1>Raptor Store</h1>
      <p
        style={{
          position: "absolute",
          top: "1rem",
          right: ".5rem",
          fontSize: ".8rem",
          fontWeight: "bold",
        }}
      >
        V1.0
      </p>
    </header>
  );
}

export default Header