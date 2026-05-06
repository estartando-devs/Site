import { Code2, Palette, Server } from 'lucide-react';

type Course = { label: string; value: string };

type Props = {
  courses: Course[];
  selectedCourse: string | null;
  setSelectedCourse: (v: string | null) => void;
};

const courseIcons: Record<string, React.ReactNode> = {
  'Desenvolvimento Web': <Code2 className="w-6 h-6" />,
  'Desenvolvimento Backend': <Server className="w-6 h-6" />,
  'Design UI/UX': <Palette className="w-6 h-6" />,
};

export const CourseSelector = ({
  courses,
  selectedCourse,
  setSelectedCourse,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-base sm:text-lg font-semibold text-brand-teal/80 mb-2">
        Qual curso você quer fazer?
      </span>
      <div className="flex flex-col gap-4 w-full max-w-md justify-center">
        {courses.map((course) => {
          const isSelected = selectedCourse === course.value;
          return (
            <button
              key={course.value}
              type="button"
              className={`flex items-center justify-between gap-3 px-6 py-5 rounded-2xl border transition-all duration-300 w-full group
                ${
                  isSelected
                    ? 'bg-brand-teal/10 border-brand-teal/50 text-brand-teal shadow-[0_0_20px_rgba(0,191,166,0.1)]'
                    : 'bg-surface-variant/30 border-white/5 text-white/60 hover:bg-white/5 hover:border-white/10 hover:text-white'
                }
              `}
              onClick={() =>
                setSelectedCourse(isSelected ? null : course.value)
              }
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    isSelected
                      ? 'bg-brand-teal/20 text-brand-teal'
                      : 'bg-white/5 text-white/40 group-hover:text-white'
                  }`}
                >
                  {courseIcons[course.value]}
                </div>
                <span className="font-bold text-lg">{course.label}</span>
              </div>
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_10px_rgba(0,191,166,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
