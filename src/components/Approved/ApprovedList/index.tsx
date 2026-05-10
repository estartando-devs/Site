import { Course } from '../../Courses/Course';
import { Typography } from '../../Typography';
import { coursesData } from './mock';

export const ApprovedList = () => (
  <section
    id="Resultado"
    className="w-full max-w-desktop_fullhd mx-auto px-8 md:px-0 py-8 flex flex-col gap-8"
  >
    <Typography
      variant="h2"
      className="text-center underline underline-offset-8 mb-8"
    >
      Lista de Aprovados
    </Typography>

    <div className="flex flex-col w-full">
      {Object.keys(coursesData).map((key: string) => (
        <Course
          key={key}
          acordionTitle="Ver Lista"
          withAnimation={false}
          courseData={coursesData[key]}
          className="uppercase"
        />
      ))}
    </div>
  </section>
);
