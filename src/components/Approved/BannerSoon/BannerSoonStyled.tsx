import styled from 'styled-components';

export const BannerSoonContainer = styled.div`
  padding: 70px 100px 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette?.design?.purple};

  @media (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const BannerContent = styled.div`
  width: 100%;
  max-width: 1028px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
