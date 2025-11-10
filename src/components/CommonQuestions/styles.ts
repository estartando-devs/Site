import styled, { css } from 'styled-components';
import { Typography } from '../Typography';

export const HeaderModern = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 2.5rem auto;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 3rem 0 0.5rem 0;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 2rem 0 0.5rem 0;
  }
`;

export const HeaderTitle = styled(Typography)`
  ${({ theme: { typography, palette } }) => css`
    font-size: ${typography.h2?.fontSize};
    font-family: ${typography.h2?.fontFamily};
    font-weight: ${typography.h2?.fontWeight};
    line-height: ${typography.h2?.lineHeight};
    color: ${palette.design.white};
  `}
  text-align: left;
  span {
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 900;
  }
`;

export const CommonQuestionsSection = styled.section`
  min-height: 100vh;
  background: ${({ theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 4rem 1rem;
`;

export const QestionsContent = styled.aside`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const QuestionsWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

export const Question = styled.details`
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: none;
`;

export const QuestionHeader = styled.summary`
  width: 100%;
  cursor: pointer;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0 2rem 0;
  transition: background 0.2s;
  &:hover {
    background: rgba(129, 202, 168, 0.03);
  }
`;

export const QuestionNumber = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 700;
  font-size: 1.1rem;
  margin-right: 1.5rem;
  min-width: 2.2rem;
  display: inline-block;
  text-align: right;
`;

export const QuestionTitle = styled(Typography)`
  ${({ theme: { typography, palette } }) => css`
    font-size: 1.15rem;
    font-weight: 700;
    color: ${palette.design.white};
    font-family: ${typography.body1?.fontFamily};
  `}
  text-align: left;
  flex: 1;
`;

export const AccordionIcon = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
`;

export const QuestionContent = styled.div`
  overflow: hidden;
  padding: 0 0 0 3.7rem;
  padding-top: 0.5rem;
  padding-bottom: 2rem;
`;

export const AnswerText = styled(Typography)`
  ${({ theme: { typography } }) => css`
    font-size: 1rem;
    color: #e3e3e3;
    font-family: ${typography.body2?.fontFamily};
    font-weight: ${typography.body2?.fontWeight};
    line-height: 1.7;
  `}
`;
