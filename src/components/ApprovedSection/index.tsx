import { useMultipleApprovedSubscriptions } from '../../hooks/useMultipleApprovedSubscriptions';
import { ErrorState } from '../ErrorState';
import { ListApprovedCourses } from '../ListApprovedCourses';
import { ListApprovedSkeleton } from '../ListApprovedCourses/Skeleton';

const ApprovedSection = () => {
  const { approvedData, loading, error, refetch } =
    useMultipleApprovedSubscriptions('2026');

  const handleRetry = () => {
    refetch();
  };

  if (loading) {
    return <ListApprovedSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  if (approvedData.length === 0) {
    return null; // Não exibe nada se não houver dados
  }

  return <ListApprovedCourses approvedListCourse={approvedData} />;
};

export default ApprovedSection;
