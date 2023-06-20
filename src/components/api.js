import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '35805038-e4e8ca296dd3f5d333d9e11d2';
export const searchPicture = async (value, currentPage) => {
  const response = await axios.get('/', {
    params: {
      key: API_KEY,
      q: value,
      page: currentPage,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return response;
};
