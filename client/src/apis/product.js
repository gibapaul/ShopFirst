import axios from '../axios'

export const apiGetProducts = (params) => axios({
    url:'/product/',
    method: 'get',
    params
})
export const apiGetProduct = (pid) => axios({
    url:'/product/' + pid,
    method: 'get',
})
export const apiRatings = (data, token) => axios({
    url: '/product/ratings',
    method: 'put',
    headers: {
        Authorization: `Bearer ${token}` // Gửi token trong header
    },
    data
});
