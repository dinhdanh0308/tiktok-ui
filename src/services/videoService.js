import * as request from '~/utils/httpRequest';

export const getVideo = async (page, type = 'for-you') => {
    try {
        const res = await request.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
