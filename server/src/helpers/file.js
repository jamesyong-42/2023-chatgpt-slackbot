import md5 from 'md5'
const fileRename = (originalname) => {
  let name = originalname + Date.now()
  name = md5(name)
  return name
}

const fileSizeString = (size) => {
  let sizeStr = '';
  if(size>=1024 && size<1024*1024){
    sizeStr = (size/1024.0).toFixed(2)+'KB';
  }else if(size>1024*1024 && size<=1024*1024*1024){
    sizeStr = (size/(1024*1024.0)).toFixed(2)+'MB';
  }else if(size >= 1024*1024*1024){
    sizeStr = (size/(1024*1024.0*1024)).toFixed(2)+'GB';
  }else{
    sizeStr = size+'B';
  }
  return sizeStr
}

const getFilenameAndExt = (originalname) => {
  let arr = originalname.split('.')
  let ext = arr.pop()
  let filename = arr.join('.')
  return {filename, ext}
}

const filePathAppendBeforeExt = (path, append) => {
  let split = path.split('.')
  let ext = split.pop()
  split.push(append)
  split.push(ext)
  return split.join('.')
}

const getFilenameFromPath = (path) => {
  return path.split('/').pop()
}

export {
  fileRename,
  fileSizeString,
  getFilenameAndExt,
  filePathAppendBeforeExt,
  getFilenameFromPath
}