import { useTheme } from 'styled-components';
import { Typography } from '..';
import { useAnimation } from '../../hooks/useAnimation';
import { Course as ICourse } from '../../mocks';
import * as S from './styles';

type PropsCourse = {
  courseData: ICourse;
  acordionTitle?: string;
  withAnimation?: boolean;
};

export const Course = ({
  courseData,
  acordionTitle = 'Ver módulos',
  withAnimation = true,
  ...rest
}: PropsCourse) => {
  const {
    palette: {
      design: { white },
    },
  } = useTheme();

  const animationProps = useAnimation({ withAnimation });

  return (
    <S.CourseContainer {...animationProps} {...rest}>
      <S.TitleContainer
        width={courseData.widthContainerTitle}
        bgColor={courseData.backgroundTitle}
      >
        <Typography variant="body1">{courseData.title}</Typography>
      </S.TitleContainer>
      <S.IntroText>{courseData.coursePresentation}</S.IntroText>
      {/* <S.ModulesTextContainer>
        <S.ModulesText>
          {acordionTitle}
          <EyeOff aria-label="Fechar" width={24} height={24} color={white} />
          <Eye aria-label="Abrir" width={24} height={24} color={white} />
        </S.ModulesText>
        <S.ListModulesContainer>
          {courseData.courseModules.map((item, index) => (
            <li key={index}> {item}</li>
          ))}
        </S.ListModulesContainer>
      </S.ModulesTextContainer> */}
    </S.CourseContainer>
  );
};
