export type ApprovedSubscription = {
  id: string;
  email: string;
  fullName: string;
  course: string;
  applicationStatus: 'approved' | 'pending' | 'rejected';
  applicationDate: string;
};

export type ApprovedSubscriptionsResponse = {
  course: string;
  year: string;
  totalApproved: number;
  subscriptions: ApprovedSubscription[];
};

type ApprovedSubscriptionsParams = {
  course: string;
  year?: string;
};

export const getApprovedSubscriptions = async ({
  course,
  year = '2025',
}: ApprovedSubscriptionsParams): Promise<ApprovedSubscriptionsResponse> => {
  const params = new URLSearchParams({
    course,
    year,
  });

  const response = await fetch(
    `https://9h6j9n1vpc.execute-api.us-east-1.amazonaws.com/subscriptions/approved-course?${params}`,
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
