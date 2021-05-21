import Axios from 'axios';

const protocol = 'https';
const host = 'ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/query';
const scriptQuery = 'x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser%20(lite)&x-algolia-application-id=OFCNCOG2CU&x-algolia-api-key=f54e21fa3a2a0160595bb058179bfb1e';
const url = `${protocol}://${host}?${scriptQuery}`;
const paramsStatic = {
  hitsPerPage: 1000,
  attributesToHighlight: [],
  attributesToRetrieve: [
    "deprecated",
    "description",
    "githubRepo",
    "homepage",
    "keywords",
    "license",
    "name",
    "owner",
    "version"
  ],
  analyticsTags: ["jsdelivr"],
};
const getBody = (query, page) => {
  const obj = {
    query,
    page,
    ...paramsStatic,
  };
  let params = '';

  for (let key in obj) {
    if (params) params += "&";

    params += key + "=" + encodeURIComponent(obj[key]);
  }

  return JSON.stringify({ params });
};

export default {
  install(Vue, { store }) {
    const axios = Axios.create();

    axios.interceptors.response.use(
      async response => response.data,
      async error => {
        if (error.response) {
          console.log('error.response');
          console.dir(error.response);
          return false;
        } else {
          console.log('error.message');
          console.dir(error.message || 'error.network');
          return false;
        }
      }
    );

    const api = {
      getList: (query, offset) => axios.post(
        url,
        getBody(query, offset)
      ),
    };

    Vue.prototype.$axios = axios;
    Vue.prototype.$api = api;
    store.$axios = axios;
    store.$api = api;
  }
};
