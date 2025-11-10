import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.design.orange};
  text-align: center;
  padding: 2rem;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin: 0;
  max-width: 500px;
  line-height: 1.5;
`;

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  message = 'Ocorreu um erro ao carregar os dados',
  onRetry,
}: ErrorStateProps) => (
  <ErrorContainer>
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorMessage>{message}</ErrorMessage>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'transparent',
          border: '2px solid #FF6A2B',
          color: '#FF6A2B',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Tentar novamente
      </button>
    )}
  </ErrorContainer>
);
