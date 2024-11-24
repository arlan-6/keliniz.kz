import NextAuth from "next-auth";
import Google from "next-auth/providers/google";



export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		async jwt({ token, user, account, profile }) {
			if (user) {
				// Assign roles based on some condition
				if (user.email === "arlanhan1997@gmail.com") {
					token.role = "admin";
				} else if (userHasBoughtContent(user.email as string)) {
					token.role = "subscriber";
				} else {
					token.role = "user";
				}
			}

			// token.likedTemplates = await getLikedTemplates(token.email);

			return token;
		},
		async session({ session, token }) {
			session.user.role = token.role;
			// session.user.likedTemplates = token.likedTemplates;
			return session;
		},
	},
});

function userHasBoughtContent(email: string): boolean {
	// Implement your logic to check if the user has bought content
	return false;
}

export async function getLikedTemplates(email: string): Promise<string[]> {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_SERVER_URL+`/templates/liked?email=${email}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${email}`,
				},
			},
		);

		if (!response.ok) {
			console.error(
				`Error fetching liked templates: ${response.status} ${response.statusText}`,
			);
			return [];
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch liked templates:", error);
		return [];
	}
}
