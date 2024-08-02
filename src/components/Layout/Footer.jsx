import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  opacity: ${(props) => (props.$visible ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`;

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <FooterContainer $visible={isVisible}>
      <p>© 2024 Hoshimo Resorts</p>
    </FooterContainer>
  );
}

export default Footer;
