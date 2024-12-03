import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function getUserInvites(email: string) {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_SERVER_URL+`/invites?email=${email}`, fetcher);

    return {
        invites: data,
        isLoading: !error && !data,
        isError: error
    };
}