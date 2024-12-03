import useSWRMutation from "swr/mutation";

type TrackRsvpReturnType = {
	data: any | null;
	pending: boolean;
	error: Error | null;
	isSuccess: boolean;
	TrackRsvp: (
		inviteId: string,
		inviteData: { FullName: string; WhoAreYou: string },
	) => void;
};

export const useTrackRsvp = (): TrackRsvpReturnType => {
	const { trigger, data, error, isMutating } = useSWRMutation(
		process.env.NEXT_PUBLIC_SERVER_URL + "/invites/update",
		async (
			url: string,
			{
				arg: { inviteId, inviteData },
			}: {
				arg: {
					inviteId: string;
					inviteData: { FullName: string; WhoAreYou: string };
				};
			},
		) => {
			const publish = await fetch(url + "/" + inviteId, {
				cache: "no-cache",
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inviteData),
			});

			if (!publish.ok) {
				throw new Error("Failed to publish invite");
			}

			return await publish.json();
		},
	);

	const TrackRsvp = (
		inviteId: string,
		inviteData: { FullName: string; WhoAreYou: string },
	) => {
		trigger({ inviteId, inviteData });
	};

	return {
        data,
        pending: isMutating,
        error,
        isSuccess: !error && !isMutating && data !== null,
        TrackRsvp,
    };
};

export const useDeleteRsvp = (): TrackRsvpReturnType => {
	const { trigger, data, error, isMutating } = useSWRMutation(
		process.env.NEXT_PUBLIC_SERVER_URL + "/invites/delete/rsvp",
		async (
			url: string,
			{
				arg: { inviteId, inviteData },
			}: {
				arg: {
					inviteId: string;
					inviteData: { FullName: string; WhoAreYou: string };
				};
			},
		) => {
			const response = await fetch(url+"/"+inviteId, {
				cache: "no-cache",
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inviteData),
			});

			if (!response.ok) {
				throw new Error("Failed to delete invite");
			}

			return await response.json();
		},
	);

	const DeleteRsvp = (
		inviteId: string,
		inviteData: { FullName: string; WhoAreYou: string },
	) => {
		trigger({ inviteId, inviteData });
	};

	return {
		data,
		pending: isMutating,
		error,
		isSuccess: !error && !isMutating && data !== null,
		// @ts-ignore
		TrackRsvp: DeleteRsvp,
	};
};