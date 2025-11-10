import * as S from './ApprovedListStyled';
import { coursesData } from './mock';

export const ApprovedList = () => (
  <S.ApprovedListContainer id="Resultado">
    <S.ApprovedTitle>Lista de aprovados pro curso</S.ApprovedTitle>
    <S.Lists>
      {Object.keys(coursesData).map((key: string) => (
        <S.CourseData
          key={key}
          acordionTitle="Ver Lista"
          withAnimation={false}
          courseData={coursesData[key]}
        />
      ))}
    </S.Lists>
  </S.ApprovedListContainer>
);
