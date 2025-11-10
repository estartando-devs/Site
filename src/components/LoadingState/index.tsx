import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.design.white};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.palette.gray[2]};
  border-top: 4px solid ${({ theme }) => theme.palette.design.purple};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type LoadingStateProps = {
  message?: string;
};

export const LoadingState = ({
  message = 'Carregando...',
}: LoadingStateProps) => (
  <LoadingContainer>
    <Spinner />
    {message}
  </LoadingContainer>
);
