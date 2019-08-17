import axios from 'axios';

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
 Photos:{
    allPhotos: function(){
    return axios.get("/api/photos")     
    },
    getThePhoto: function(name){
    return axios.get(`/api/photos/${name}`)
    },
    deleted: function(ids){
        return axios.post(`api/photos/delete/${ids}`)
    },
    upload: function(filez,location, authToken){
        const url = '/api/photos';
        console.log(authToken)
        const formData = new FormData();
        formData.append('file',filez)
        formData.append('location',location)
        const config = {
            headers: {
              'Authorization': `Bearer ${authToken}`,
                'content-type': 'multipart/form-data'
                
            }
            
        }
       
        return axios.post(url, formData, config)
    }
  }
}
