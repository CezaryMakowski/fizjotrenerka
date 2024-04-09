export default function NotFound() {
  return (
    <section
      style={{
        padding: "10rem",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <h2 style={{ color: "var(--secondary-color)" }}>Błąd 404</h2>
      <p style={{ color: "var(--primary-color)" }}>
        Niestety nic nie znaleziono
      </p>
    </section>
  );
}
