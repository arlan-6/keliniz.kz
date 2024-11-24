export const getInvite = async (id: string) => {
	const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+`/edit/invites/${id}`);
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error("Failed to get invite");
	}
};
