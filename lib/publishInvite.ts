import useSWRMutation from 'swr/mutation';

type PublishInviteReturnType = {
  data: any | null;
  pending: boolean;
  error: Error | null;
  publishInvite: (inviteId: string) => void;
};

export const usePublishInvite = (): PublishInviteReturnType => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    process.env.NEXT_PUBLIC_SERVER_URL+'/invites/publish',
    async (url: string, { arg: inviteId }: { arg: string }) => {
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+`/edit/invites/${inviteId}`);
      if (!res.ok) {
        throw new Error('Error fetching invite data.');
        
      }
      const { email, templateId, inviteDetails, inviteName } = await res.json();

      const invte = {
        id: crypto.randomUUID().replace(/-/g, ''),
        inviteId,
        email,
        templateId,
        inviteDetails,
        inviteName,
        rsvp:[]
      };

      const publish = await fetch(url, {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invte),
      });

      if (!publish.ok) {
        
        throw new Error(error);
      }

      return await publish.json();
    }
  );

  const publishInvite = (inviteId: string) => {
    trigger(inviteId);
  };

  return {
    data,
    pending: isMutating,
    error,
    publishInvite,
  };
};