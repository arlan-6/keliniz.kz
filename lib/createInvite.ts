import Values from "@/components/template/default";

export const createInvite = async (templateId: string, email: string) => {
	const properties = await fetch(
		process.env.NEXT_PUBLIC_SERVER_URL+`/templates/${templateId}`,
	).then((res) => res.json());
	const inviteID = crypto.randomUUID().replace(/-/g, "");
	// console.log(inviteID);

	const defaultProperties = Values[templateId] || {};

	const invite = {
		inviteName: "invite",
		inviteId: inviteID,
		email: email,
		templateId,
		inviteDetails: defaultProperties,
	};

	const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+`/edit/invites`, {
		cache: "no-cache",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(invite),
	});
	if (res.ok) {
		const data = await res.json();
		const id = data.id; // Adjust based on the actual response structure
		// console.log(id);

		return id;
	} else {
		throw new Error("Failed to create invite");
	}
};
