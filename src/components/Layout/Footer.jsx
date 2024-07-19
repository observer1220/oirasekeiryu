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
`;

function Footer() {
  return (
    <FooterContainer>
      <p>© 2024 Hoshimo Resorts</p>
    </FooterContainer>
  );
}

export default Footer;
