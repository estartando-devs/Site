import { useMultipleApprovedSubscriptions } from '../../hooks/useMultipleApprovedSubscriptions';
import { ErrorState } from '../ErrorState';
import { ListApprovedCourses } from '../ListApprovedCourses';
import { LoadingState } from '../LoadingState';

const ApprovedSection = () => {
  const { approvedData, loading, error, refetch } =
    useMultipleApprovedSubscriptions('2025');

  const handleRetry = () => {
    refetch();
  };

  if (loading) {
    return (
      <LoadingState message="Carregando lista de aprovados pro curso..." />
    );
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
