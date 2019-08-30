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
      return axios.get('/api/secrets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },
  Photos: {
    allPhotos: function (page) {
      
      return axios.get(`/api/photos/${page}`)
    },
    deleted: function (ids) {
      return axios.post(`api/photos/delete/${ids}`)
    },
    upload: function (filez, location, authToken) {
      const url = '/api/photos';
      console.log(authToken)
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
    sortPages: function(){
     return axios.get("/api/pages").then(pages => {
        let holder = pages.data
        
        holder.sort(function (a, b) {
          a = moment(a.pageName).unix();
          b = moment(b.pageName).unix();
         
          return a > b ? -1 : a < b ? 1 : 0;
        })
    
        let names =holder.map(pages => pages.pageName)
        return {pageNames:names, availablePages:holder}
        
    })},
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
