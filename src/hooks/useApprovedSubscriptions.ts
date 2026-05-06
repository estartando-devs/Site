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

  const getCourseKey = (courseName: string) => {
    const normalizedCourse = courseName.toLowerCase().trim();

    const courseKeys: Record<string, string> = {
      web: 'web',
      javascript: 'web',
      frontend: 'web',
      backend: 'backend',
      design: 'designUiUx',
      'ui/ux': 'designUiUx',
      'design ui/ux': 'designUiUx',
      'desenvolvimento web': 'web',
      'desenvolvimento backend': 'backend',
    };

    return courseKeys[normalizedCourse] || normalizedCourse;
  };

  const fetchApprovedData = async () => {
    if (!course) {
      setError('Curso não especificado');
      return;
    }

    const courseKey = getCourseKey(course);

    try {
      setLoading(true);
      setError(null);

      const response: ApprovedSubscriptionsResponse =
        await getApprovedSubscriptions({
          year,
        });

      const courseKey = course.toLowerCase();
      const students = response.integrantes[courseKey] || [];

      // Transformar os dados da API para o formato esperado pelo componente
      const transformedData: ObjectCourseType = {
        course: course,
        color: getCourseColor(course),
        students: sortNamesAlphabetically(students),
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
