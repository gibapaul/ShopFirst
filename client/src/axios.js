import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
  });

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
  let cocalStoregeData = window.localStorage.getItem('persist:shop/user')
  if(cocalStoregeData&& typeof cocalStoregeData === 'string') {
    cocalStoregeData = JSON.parse(cocalStoregeData)
    const accessToken = JSON.parse(cocalStoregeData?.token)
    config.headers = {Authorization: `Bearer ${accessToken}`}
    return config
  }else
    return config;
  }, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  });

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.response.data;
  });
  export default instance