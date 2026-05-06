import Link from 'next/link';
import { Logo } from '..';
import { Typography } from '../Typography';

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
        <span key={index} className="block ml-4">
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
    <section className="min-h-screen bg-surface-dark flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-[800px] flex flex-col md:flex-row items-center gap-8 mb-10 text-left">
        <Link href="/" className="flex items-center no-underline shrink-0">
          <Logo width={48} height={68} priority quality={30} />
        </Link>
        <Typography
          variant="h1"
          className="text-white text-[2.25rem] leading-tight [&>span]:text-brand-teal [&>span]:font-black"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>

      <div className="w-full max-w-[800px] flex flex-col">
        {questions.map(({ key, question, answer }, idx) => (
          <details
            key={key}
            className="group border-b border-white/10 bg-transparent"
          >
            <summary className="flex items-center justify-between py-8 cursor-pointer list-none hover:bg-brand-teal/5 transition-all outline-none">
              <div className="flex items-center gap-6 flex-1">
                <span className="text-brand-teal font-bold text-lg min-w-[2.2rem] text-right">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <Typography
                  variant="h2"
                  className="text-lg md:text-xl font-bold text-white text-left flex-1"
                >
                  {question}
                </Typography>
              </div>
              <div className="text-brand-teal group-open:rotate-180 transition-transform ml-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-current"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </summary>
            <div className="pb-8 pl-[3.7rem] pr-4">
              <Typography
                variant="body2"
                className="text-white/80 leading-relaxed text-base md:text-lg"
              >
                {formatAnswer(answer)}
              </Typography>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
