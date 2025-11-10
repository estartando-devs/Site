import styled, { css } from 'styled-components';
import { Typography } from '../Typography';

export const ModalitiesSection = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.palette.gray[1]};
`;

export const Title = styled.h2`
  font-size: 72px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.background.default};
  margin-bottom: 2.5rem;
  text-align: center;
  font-family: 'Ubuntu', sans-serif;
  letter-spacing: 2px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${({ theme: { palette } }) =>
    palette.primary.main};
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    font-size: 40px;
  }
  @media (max-width: 500px) {
    font-size: 28px;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  gap: 2.5rem;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const Card = styled.div`
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows[0]};
  border: 1px solid ${({ theme }) => theme.palette.gray[2]};
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 969px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    width: 100%;
    min-width: 0;
    max-width: 400px;
  }
`;

export const CardImage = styled.img`
  width: 420px;
  height: 490px;
  object-fit: cover;
`;

export const Badge = styled.div`
  position: absolute;
  top: 394px;
  left: -10px;
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.palette.design.white};
  font-weight: 700;
  font-size: 24px;
  border: 1px solid ${({ theme }) => theme.palette.gray[2]};
  font-family: 'Ubuntu', sans-serif;
  padding: 0.5rem 1.5rem;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;

  width: 267px;
  height: 68px;

  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1),
    inset 2px 2px 0.5px rgba(255, 255, 255, 0.5),
    inset -2px -2px 0.55px rgba(255, 255, 255, 0.5),
    inset 0px 0px 8px rgba(160, 160, 160, 0.5);
  backdrop-filter: blur(6px);

  z-index: 2;
`;

export const CardContent = styled.div`
  height: 479px;
  border-radius: 0 0 12px 12px;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const CardTitle = styled(Typography).attrs({
  variant: 'h2',
})`
  color: ${({ theme }) => theme.palette.design.white};
  font-size: 32px;
`;

export const CardDescription = styled(Typography)`
  color: ${({ theme }) => theme.palette.design.white};
  font-size: 1rem;
  line-height: 1;
  font-family: 'Ubuntu', sans-serif;
`;

export const CardItem = styled.li`
  color: ${({ theme }) => theme.palette.design.white};
  font-size: 16px;
  display: inline-flex;
  font-weight: 700;
  font-family: 'Ubuntu', sans-serif;
`;

export const CardList = styled.ul`
  margin: 0.5rem 0 1.5rem 0;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.palette.design.white};
  font-size: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li::before {
    content: '▶';
    color: ${({ theme }) => theme.palette.primary.main};
    margin-right: 0.5rem;
    font-size: 0.9rem;
  }
`;

export const CardButton = styled.button`
  width: 100%;
  padding: 1rem 0;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  font-weight: 700;
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.design.white};
  cursor: pointer;
  margin-top: auto;
  transition: background 0.2s;

  &:disabled {
    background: ${({ theme }) => theme.palette.gray[2]};
    color: ${({ theme }) => theme.palette.gray[4]};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.palette.primary.main};
    opacity: 0.9;
  }
`;

export const CardButtonText = styled(Typography).attrs({
  variant: 'body1',
})`
  ${({ disabled }: { disabled?: boolean }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
  font-size: 24px;
  font-weight: 700;
  font-family: 'Ubuntu', sans-serif;

  @media (max-width: ${({ theme }) => theme.media.tablet}) {
    font-size: 18px;
  }
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;
