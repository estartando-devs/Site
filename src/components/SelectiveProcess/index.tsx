import { ScheduleSectionProps } from '../../mocks/Schedule.mock';
import * as S from './styles';

const ScheduleDotGroup = ({ disabled }: { disabled?: boolean }) => (
  <>
    <S.ScheduleDot disabled={disabled}></S.ScheduleDot>
    <S.ScheduleLittleDot></S.ScheduleLittleDot>
    <S.ScheduleLittleDot></S.ScheduleLittleDot>
    <S.ScheduleLittleDot></S.ScheduleLittleDot>
    <S.ScheduleLittleDot></S.ScheduleLittleDot>
  </>
);

export const SelectiveProcess = ({
  title,
  stagesList,
  schedule,
}: ScheduleSectionProps) => {
  return (
    <S.Section>
      <S.Title
        variant="h2"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {stagesList.map(({ key, stage }) => (
        <S.ContentStages
          key={key}
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top-center"
        >
          <S.StageTitle variant="h3">{stage.title}</S.StageTitle>
          <S.Text variant="body2">{stage.description}</S.Text>
        </S.ContentStages>
      ))}

      <S.ScheduleWrapper>
        <S.ScheduleDotsWrapper
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top-center"
        >
          {schedule.map(({ key, disable }, index) => {
            const isTheLast = index === schedule.length - 1;
            return isTheLast ? (
              <S.ScheduleDot key={key} disabled={disable} />
            ) : (
              <ScheduleDotGroup key={key} disabled={disable} />
            );
          })}
        </S.ScheduleDotsWrapper>

        <S.ScheduleContentWrapper>
          {schedule.map(({ title, description, disable, key }) => (
            <S.ScheduleItem
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-anchor-placement="top-center"
              key={`${title}-${key}`}
              variant="h3"
              disabled={disable}
            >
              {title} - <span>{description}</span>
            </S.ScheduleItem>
          ))}
        </S.ScheduleContentWrapper>
      </S.ScheduleWrapper>
    </S.Section>
  );
};
