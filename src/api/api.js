const BASE_URL = 'http://localhost:3000';

export const getProducts = async ({ status, search, page = 1, limit = 10 }) => {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('limit', limit);
  

  const response = await fetch(`${BASE_URL}/admin/products?${params.toString()}`);
  console.log('Search URL:', `${BASE_URL}/admin/products?${params.toString()}`);

  if (!response.ok) throw new Error('Không thể lấy dữ liệu');
  return await response.json();
};



export const getCategory = async ({ status, search, page = 1, limit = 10 }) => {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('limit', limit);
  

  const response = await fetch(`${BASE_URL}/admin/category?${params.toString()}`);
  console.log('Search URL:', `${BASE_URL}/admin/category?${params.toString()}`);

  if (!response.ok) throw new Error('Không thể lấy dữ liệu');
  return await response.json();
};

export const getReviews = async ({ status, search, page = 1, limit = 10 }) => {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('limit', limit);
  

  const response = await fetch(`${BASE_URL}/admin/review?${params.toString()}`);
  console.log('Search URL:', `${BASE_URL}/admin/review?${params.toString()}`);

  if (!response.ok) throw new Error('Không thể lấy dữ liệu');
  return await response.json();
};



export const getDisCountManger = async ({ status, search, page = 1, limit = 10 }) => {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('limit', limit);
  

  const response = await fetch(`${BASE_URL}/admin/disCountManger?${params.toString()}`);
  console.log('Search URL:', `${BASE_URL}/admin/disCountManger?${params.toString()}`);

  if (!response.ok) throw new Error('Không thể lấy dữ liệu');
  return await response.json();
};


export const getallOrder = async ({ status, search, page = 1, limit = 10 }) => {
  const params = new URLSearchParams();

  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('limit', limit);
  

  const response = await fetch(`${BASE_URL}/admin/order?${params.toString()}`);
  console.log('Search URL:', `${BASE_URL}/admin/order?${params.toString()}`);

  if (!response.ok) throw new Error('Không thể lấy dữ liệu');
  return await response.json();
};