import { Link } from "react-router-dom";
import Container from "./Container";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#ffffff", padding: "20px 0" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            to="/"
            style={{
              fontSize: "20px",
              fontWeight: "900",
              textDecoration: "none",
              color: "#000000",
            }}
          >
            P
          </Link>
          <Link
            to="/my-pokemon"
            style={{
              fontSize: "20px",
              fontWeight: "900",
              textDecoration: "none",
              color: "#000000",
            }}
          >
            My Pokemon
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Header;
