

export function getRedirectPath(type,header) {
  let path='';
  if(type==='god'){
    path='/god'
  }else {

    path='/boss'
  }

  if(!header){

    path+='info'
  }
  return path;
}