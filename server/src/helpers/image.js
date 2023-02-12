import sharp from 'sharp'
const ColorThief = require('colorthief')

const imgResize = (buffer, width, mimetype) => {
  const img = sharp(buffer)

  if (mimetype === 'image/png') {
    let _meta
    return img
      .metadata()
      .then(meta => {
        _meta = meta
        return img.resize(width, width, { fit: 'fill' }).png().toBuffer()
      })
      .then(buf => {
        return Promise.resolve({
          buffer: buf,
          meta: _meta,
        })
      })
  } else {
    let _meta
    return img
      .metadata()
      .then(meta => {
        _meta = meta
        return img
          .resize(width, width, { fit: 'fill' })
          .jpeg({ mozjpeg: true })
          .toBuffer()
      })
      .then(buf => {
        return Promise.resolve({
          buffer: buf,
          meta: _meta,
        })
      })
  }
}

const extractColorPalette = file => {
  return new Promise(resolve => {
    let dominantColor, colorPalette
    ColorThief.getColor(file)
      .then(data => {
        // console.log(data)
        dominantColor = data
        return ColorThief.getPalette(file)
      })
      .then(data => {
        // console.log(data)
        colorPalette = data

        resolve({
          dominantColor,
          colorPalette
        })
      })
  })
}

const imgBufferToBase64 = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString('base64')}`
}

export { imgResize, imgBufferToBase64, extractColorPalette }
