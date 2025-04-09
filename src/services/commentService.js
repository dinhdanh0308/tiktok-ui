import * as request from '~/utils/httpRequest';

export const getVideo = async (id) => {
    try {
        const res = await request.get(`/videos/1/comments`, {
            params: {
                id,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
// tren sai chua biet chinh id nhu nao
