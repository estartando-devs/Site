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
    name: 'Desenvolvimento Web',
    displayName: 'Desenvolvimento Web',
    color: 'green_dark',
  },
  {
    name: 'Desenvolvimento Backend',
    displayName: 'Desenvolvimento Backend',
    color: 'blue_dark',
  },
  { name: 'Design UI/UX', displayName: 'Design UI/UX', color: 'purple' },
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

      const promises = COURSES_CONFIG.map(async (courseConfig) => {
        try {
          const response: ApprovedSubscriptionsResponse =
            await getApprovedSubscriptions({
              course: courseConfig.name,
              year,
            });

          // Só retorna se houver aprovados
          if (response.subscriptions.length > 0) {
            return {
              course: courseConfig.displayName,
              color: courseConfig.color,
              students: sortNamesAlphabetically(
                response.subscriptions.map((sub) => sub.fullName),
              ),
            } as ObjectCourseType;
          }
          return null;
        } catch (err) {
          console.error(`Error fetching data for ${courseConfig.name}:`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);
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
