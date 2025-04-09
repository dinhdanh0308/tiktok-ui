import * as request from '~/utils/httpRequest';

export const getFollowing = async ({ q }) => {
    try {
        const res = await request.get('me/followings', {
            params: {
                q,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
