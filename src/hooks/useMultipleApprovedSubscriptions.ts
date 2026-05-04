import { useEffect, useState } from 'react';
import { ObjectCourseType } from '../components/ListApprovedCourses';
import {
  ApprovedSubscriptionsResponse,
  getApprovedSubscriptions,
} from '../services/approvedSubscriptions';
import { sortNamesAlphabetically } from '../utils/nameFormatter';

type CourseConfig = {
  name: string;
  displayName: string;
  color: 'green_dark' | 'blue_dark' | 'purple';
};

const COURSES_CONFIG: CourseConfig[] = [
  {
    name: 'web',
    displayName: 'Desenvolvimento Web',
    color: 'green_dark',
  },
  {
    name: 'backend',
    displayName: 'Desenvolvimento Backend',
    color: 'blue_dark',
  },
  { name: 'designUiUx', displayName: 'Design UI/UX', color: 'purple' },
];

type UseMultipleApprovedSubscriptionsReturn = {
  approvedData: ObjectCourseType[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useMultipleApprovedSubscriptions = (
  year = '2025',
): UseMultipleApprovedSubscriptionsReturn => {
  const [approvedData, setApprovedData] = useState<ObjectCourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllApprovedData = async () => {
    try {
      setLoading(true);
      setError(null);

       const response: ApprovedSubscriptionsResponse =
            await getApprovedSubscriptions({
              year
            });

      const results = COURSES_CONFIG.map((courseConfig) => {
        try {
          const courseNames = response.integrantes[courseConfig.name];

          // Só retorna se houver aprovados
          if (courseNames && courseNames.length > 0) {
            return {
              course: courseConfig.displayName,
              color: courseConfig.color,
              students: sortNamesAlphabetically(courseNames),
            } as ObjectCourseType;
          }
          return null;
        } catch (err) {
          console.error(`Error fetching data for ${courseConfig.name}:`, err);
          return null;
        }
      });

      const validResults = results.filter(
        (result) => result !== null,
      ) as ObjectCourseType[];

      setApprovedData(validResults);
    } catch (err) {
      setError('Erro ao carregar a lista de aprovados pro curso');
      console.error('Error fetching approved data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllApprovedData();
  }, [year]);

  return {
    approvedData,
    loading,
    error,
    refetch: fetchAllApprovedData,
  };
};
