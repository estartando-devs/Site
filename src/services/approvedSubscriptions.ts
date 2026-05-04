export type ApprovedSubscription = {
  id: string;
  email: string;
  fullName: string;
  course: string;
  applicationStatus: 'approved' | 'pending' | 'rejected';
  applicationDate: string;
};

export type ApprovedSubscriptionsResponse = {
  ano: string;
  status: string;
  integrantes: { [course: string]: string[] };
};

type ApprovedSubscriptionsParams = {
  year?: string;
};

export const getApprovedSubscriptions = async ({
  year = '2025',
}: ApprovedSubscriptionsParams): Promise<ApprovedSubscriptionsResponse> => {
  // `https://9h6j9n1vpc.execute-api.us-east-1.amazonaws.com/subscriptions/approved-course?${params}`

  const response = await fetch(
    `https://9h6j9n1vpc.execute-api.us-east-1.amazonaws.com/inscricoes/integrantes?ano=${year}&status=aprovado_triagem`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch approved subscriptions: ${response.statusText}`,
    );
  }

  return response.json();
};
