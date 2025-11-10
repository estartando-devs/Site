import Link from 'next/link';
import { Logo } from '..';
import * as S from './styles';

export type Question = {
  question: string;
  answer: string;
  key: string;
};

export type CommonQuestionsProps = {
  title: string;
  questions: Array<Question>;
};

const formatAnswer = (answer: string) => {
  return answer.split('\n').map((line, index) => {
    if (line.trim() === '') return <br key={index} />;
    if (line.trim().startsWith('•')) {
      return (
        <span key={index} style={{ display: 'block', marginLeft: 16 }}>
          {line}
        </span>
      );
    }
    return (
      <span key={index}>
        {line}
        <br />
      </span>
    );
  });
};

export const CommonQuestions = ({ title, questions }: CommonQuestionsProps) => {
  return (
    <S.CommonQuestionsSection>
      <S.HeaderModern>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <Logo width={48} height={68} priority quality={30} />
        </Link>
        <S.HeaderTitle
          variant="h1"
          color="white"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </S.HeaderModern>
      <S.QestionsContent>
        <S.QuestionsWrapper>
          {questions.map(({ key, question, answer }, idx) => (
            <S.Question key={key}>
              <S.QuestionHeader>
                <S.QuestionNumber>
                  {String(idx + 1).padStart(2, '0')}.
                </S.QuestionNumber>
                <S.QuestionTitle variant="h2" weight="700">
                  {question}
                </S.QuestionTitle>
                <S.AccordionIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </S.AccordionIcon>
              </S.QuestionHeader>
              <S.QuestionContent>
                <S.AnswerText variant="body2" weight="500">
                  {formatAnswer(answer)}
                </S.AnswerText>
              </S.QuestionContent>
            </S.Question>
          ))}
        </S.QuestionsWrapper>
      </S.QestionsContent>
    </S.CommonQuestionsSection>
  );
};
