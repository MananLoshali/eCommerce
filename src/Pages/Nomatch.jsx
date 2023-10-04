import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h4`
  font-weight: 600;
  font-size: 5rem;
  color: red;
`;

const Nomatch = () => {
  return (
    <>
      <Container>
        <Text>Page not found.Enter correct URL</Text>
      </Container>
    </>
  );
};

export default Nomatch;
