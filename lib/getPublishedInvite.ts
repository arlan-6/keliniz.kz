import useSWR from 'swr';

type PublishedInvite = {
  id: string;
  inviteId: string;
  email: string;
  templateId: string;
  inviteDetails: any;
  inviteName: string;
  rsvp: any[];
  // Add other fields as necessary
};

export const useGetPublishedInvite = (inviteId: string) => {
  const { data, error, isLoading } = useSWR<PublishedInvite>(
    process.env.NEXT_PUBLIC_SERVER_URL+`/invites/published/${inviteId}`,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch published invite');
      }
      return response.json();
    }
  );

  return {
    data,
    pending: isLoading,
    error,
  };
};

export const getPublishedInviteServer = async (inviteId: string): Promise<PublishedInvite> => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/invites/published/${inviteId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch published invite');
  }

  const data = await response.json();
  return data;
};