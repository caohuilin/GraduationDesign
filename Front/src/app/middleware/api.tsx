import * as fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

const handleError = (response) => {
  console.log('fetch Error', response);
};

const hostName = location.hostname;
const baseUrl = `http://${hostName}:5555/v2/`;

const getData = async (params) => {
  const url = baseUrl  + params.path;
  return await fetch(url).then((response) => {
    if (response.status >= 400) {
      handleError(response);
    }
    return response.json();
  }).then((response) => {
    return response;
  });
};

export const updateJWT = (recToken) => {
  if (recToken.indexOf('.') > -1) {
    const jwtInfoBase64 = recToken.split('.')[1];
    cookie.save('bookmanage_jwt', recToken);
  }
};

const fetchBase = (endPoint = 'hello', method = 'GET', params = {}) => {
  let url = `http://${hostName}:5555/v2/${endPoint}`;
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie.load('bookmanage_jwt')}` || ''
    }
  };

  if (method === 'GET') {
    const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`;
    url += queryString;
  } else {
    (options as any).body = JSON.stringify(params);
  }
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return res.json().then(e => {throw e; });
    }

    return res.json();
  });
};

export default fetchBase;

// 获取所有分类
const getCategoryList = async () => {
  const r = await getData({path: 'tags'}).then((data) => {
    if (typeof data === 'object') {
      return data.tags;
    }
  });
  return r;
};

// 获取对应分类下的书列表
const getCategoryBookList = async (id) => {
  if (!id) {
    id = 450;
  }
  const r = await getData({path: 'tags/' + id}).then((data) => {
    if (typeof data === 'object') {
      return data.books;
    }
  });
  return r;
};

// 获取图书信息
const getBookInfo = async (id) => {
  const r = await getData({path: 'books/' + id}).then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 获取对应图书对应章节的具体内容
const getContent = async (params) => {
  const r = await getData({path: 'books/' + params.bookId + '/content/' + params.menuId}).then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 搜索
const searchBooks = async (queryString) => {
  const r = await getData({path: 'search/books?q=' + queryString}).then((data) => {
    if (typeof data === 'object') {
      return data.books;
    }
  });
  return r;
};

// 登录
const login = async (params) => {
  const r = await fetchBase('login', 'POST', params).then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 注册
const register = async (params) => {
  const r = await fetchBase('register', 'POST', params).then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 获取用户信息
const getUserInfo = async () => {
  const r = await fetchBase('user/info', 'GET').then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 收藏图书
const collectBook = async (params) => {
  const r = await fetchBase('user/collect', 'POST', params).then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 获取收藏图书列表
const getCollectBooks = async () => {
  const r = await fetchBase('user/collect', 'GET').then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 获取推荐图书列表
const getRecommendBooks = async () => {
  const r = await fetchBase('user/recommend', 'GET').then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

// 保存用户读书状态
const saveUserStatus = async (params) => {
    const r = await fetchBase('user/status', 'POST', params).then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};
// 获取用户状态
const getUserStatus = async (params) => {
    const r = await fetchBase(`user/status/${params}`, 'GET').then((data) => {
    if (typeof data === 'object') {
      return data;
    }
  });
  return r;
};

export {
  getCategoryList,
  getCategoryBookList,
  getBookInfo,
  getContent,
  login,
  register,
  searchBooks,
  getUserInfo,
  collectBook,
  getCollectBooks,
  getRecommendBooks,
  saveUserStatus,
  getUserStatus
};
