import styled, { css } from 'styled-components';
import { Typography } from '../Typography';

export const ContainerHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const BackgroundHeader = styled.div`
  position: 'absolute';
  height: '100%';
  width: '100%';
  &::after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(30, 30, 30, 0.7);
  }
`;

export const SectionHeader = styled.section`
  display: flex;
  z-index: 1;
  gap: 3rem;
  max-width: ${({ theme: { media } }) => media.desktop_fullhd};
  width: 100%;
  padding: 0 7.5rem;

  @media (min-width: ${({ theme: { media } }) => media.desktop_fullhd}) {
    margin: 0 auto;
    padding: 0 7.5rem;
  }

  @media (max-width: ${({ theme: { media } }) => media.tablet_portrait}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 2rem;
  }
`;

export const ContainerImage = styled.picture`
  margin-top: 1.25rem;

  @media (max-width: ${({ theme: { media } }) => media.tablet_portrait}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export const ContainerHeading = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 31.25rem;

  h1 {
    margin-bottom: 1rem;
    @media (max-width: ${({ theme: { media } }) => media.tablet_portrait}) {
      margin: 0;
    }
  }
`;

export const ContainerButton = styled.div`
  margin-top: 3rem;
  max-width: 15rem;

  @media (max-width: ${({ theme: { media } }) => media.tablet_portrait}) {
    max-width: 100%;
  }
`;

export const BannerButton = styled.a`
  color: ${({ theme }) => theme.palette.design.white} !important;
  max-width: 150px;
  padding: 14px 24px !important;
  display: flex;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px;
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
