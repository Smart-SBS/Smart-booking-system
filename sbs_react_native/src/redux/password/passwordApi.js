import apiClient from '../../api/apiClient';
import {API_ENDPOINTS} from '../../api/endpoints';

const createFormData = data => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

export const changePassword = async credentials => {
  try {
    console.log('credentials', credentials?.data);

    const formData = createFormData(credentials?.data);
    const response = await apiClient.post(
      API_ENDPOINTS.POST_CHANGE_PASSWORD,
      formData,
      {
        headers: {
          Authorization: `Bearer ${credentials.token}`, // Ensure `credentials` has `token`
        },
      },
    );

    return {success: true, data: response.data};
  } catch (error) {
    console.error(
      'Error in changePassword function:',
      error.message,
      error.response?.data,
    );

    return {
      success: false,
      error: error.response?.data || {message: error.message},
    };
  }
};

