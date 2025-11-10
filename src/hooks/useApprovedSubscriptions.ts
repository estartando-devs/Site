import { useEffect, useState } from 'react';
import { ObjectCourseType } from '../components/ListApprovedCourses';
import {
  ApprovedSubscriptionsResponse,
  getApprovedSubscriptions,
} from '../services/approvedSubscriptions';
import { sortNamesAlphabetically } from '../utils/nameFormatter';

type UseApprovedSubscriptionsParams = {
  course?: string;
  year?: string;
};

type UseApprovedSubscriptionsReturn = {
  approvedData: ObjectCourseType[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const useApprovedSubscriptions = ({
  course,
  year = '2025',
}: UseApprovedSubscriptionsParams): UseApprovedSubscriptionsReturn => {
  const [approvedData, setApprovedData] = useState<ObjectCourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCourseColor = (
    courseName: string,
  ): 'green_dark' | 'blue_dark' | 'purple' => {
    const courseColors: Record<string, 'green_dark' | 'blue_dark' | 'purple'> =
      {
        javascript: 'green_dark',
        frontend: 'green_dark',
        backend: 'blue_dark',
        design: 'purple',
        'ui/ux': 'purple',
        'desenvolvimento web': 'green_dark',
        'desenvolvimento backend': 'blue_dark',
        'design ui/ux': 'purple',
      };

    const normalizedCourse = courseName.toLowerCase();
    return courseColors[normalizedCourse] || 'green_dark';
  };

  const fetchApprovedData = async () => {
    if (!course) {
      setError('Curso não especificado');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response: ApprovedSubscriptionsResponse =
        await getApprovedSubscriptions({
          course,
          year,
        });

      // Transformar os dados da API para o formato esperado pelo componente
      const transformedData: ObjectCourseType = {
        course: response.course,
        color: getCourseColor(response.course),
        students: sortNamesAlphabetically(
          response.subscriptions.map((sub) => sub.fullName),
        ),
      };

      setApprovedData([transformedData]);
    } catch (err) {
      setError('Erro ao carregar a lista de aprovados pro curso');
      console.error('Error fetching approved data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (course) {
      fetchApprovedData();
    }
  }, [course, year]);

  return {
    approvedData,
    loading,
    error,
    refetch: fetchApprovedData,
  };
};
