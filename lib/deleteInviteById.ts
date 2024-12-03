export async function deleteInviteById(inviteId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/invites/delete/${inviteId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return { isSuccess: true };
    } catch (error) {
        return { isSuccess: false, error };
    }
}