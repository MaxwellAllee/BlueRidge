import axios from 'axios';
import moment from 'moment'
export default {
  Users: {
    login: function (email, password) {
      return axios.post('/api/users/login', { email, password });
    },

    getMe: function (authToken) {
      return axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },

  Secrets: {
    getAll: function (authToken) {
      return axios.get('/api/secrets');
    }
  },
  Photos: {
    allPhotos: function (page) {
      return axios.get(`/api/photos/${page}`)
    },

    deleted: function (authToken, id) {
      const url = '/api/photos/delete';
      const data = {'id':id}
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`

        }

      }

      return axios.post(url, data, config)
    
  },
  upload: function (filez, location, authToken) {
    const url = '/api/photos';

    const formData = new FormData();
    formData.append('file', filez)
    formData.append('location', location)
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'content-type': 'multipart/form-data'

      }

    }

    return axios.post(url, formData, config)
  }
},
Pages: {
  allPages: function () {

    return axios.get("/api/pages")
  },
  sortPagesAuth: function(authToken) {
    return axios.get('/api/pages/auth', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  },
  sortPages: function() {

    return axios.get("/api/pages").then(pages => {
      let holder = pages.data

      holder.sort(function (a, b) {
        a = moment(a.pageName).unix();
        b = moment(b.pageName).unix();

        return a > b ? -1 : a < b ? 1 : 0;
      })

      let names = holder.map(pages => pages.pageName)
      return { pageNames: names, availablePages: holder }

    })
  },
  onePage: function (page) {
    return axios.get('/api/pages/' + page)
  },
  create: function (page) {
    return axios.put("/api/pages", page)
  },
  update: function (page, id) {
    return axios.post('/api/pages', { pageInfo: page, id: id })
  }
}
}
