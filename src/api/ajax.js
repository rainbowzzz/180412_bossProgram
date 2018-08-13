

import axios from 'axios';

export default function (url,data={},type='GET') {
  if(type==='GET'){
    let queryStr='';
    Object.keys(data).forEach(key=>{
      const value=data[key];
      queryStr+=`${key}=${value}&`;
    })
    if(queryStr){
      queryStr=queryStr.substring(0,queryStr.length-1);
      url= url+'?'+queryStr;
    }
    return axios.get(url)
  }else {
    return axios.post(url,data)

  }

}