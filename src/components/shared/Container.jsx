import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0;
`;

const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
