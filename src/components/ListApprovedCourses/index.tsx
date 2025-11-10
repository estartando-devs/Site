import { ApprovedCourses } from './ApprovedCourses';
import * as S from './styles';

export type ObjectCourseType = {
  color: 'green_dark' | 'blue_dark' | 'purple';
  course: string;
  students: string[];
};

export type ApprovedListCourseType = {
  approvedListCourse: Array<ObjectCourseType>;
};

export const ListApprovedCourses = ({
  approvedListCourse,
}: ApprovedListCourseType) => (
  <S.ListApprovedContainer id="resultado">
    <S.Title>
      <S.TitleCheckout>Confira a lista de</S.TitleCheckout>
      <S.TitleApproved> aprovados pro curso :D</S.TitleApproved>
    </S.Title>
    {approvedListCourse?.map((objectCourse: ObjectCourseType) => (
      <ApprovedCourses
        key={objectCourse?.course}
        approvedCourse={objectCourse}
      />
    ))}
  </S.ListApprovedContainer>
);
