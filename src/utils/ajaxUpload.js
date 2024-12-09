import $ from 'jquery'

export async function uploadpicA(imgFile) {
  const fromData = new FormData()
  const file = imgFile
  if (file.size > 10240000) {
    return Promise.resolve({
      status: 'fail',
      data: {
        msg: '',
      },
    })
  }
  fromData.append('dkPicture', file)
  const res = await ajaxUpload(fromData)
  return res
}

export function ajaxUpload(formData) {
  return new Promise((resolve) => {
    $.ajax({
      type: 'post',
      url: 'https://shryf.com/loanonlineapplication/user/getDkPictureUrl',
      data: formData,
      dataType: 'Jsonp',
      processData: false,
      contentType: false,
      jsonpCallback: 'successCallback',
      beforeSend() {},
      success(data) {
        if (data.result === '00') {
          resolve({
            status: 'ok',
            data,
          })
        }
        else {
          resolve({
            status: 'fail',
            data: {},
          })
        }
      },
      complete() {},
      error(data) {
        resolve({
          status: 'fail',
          data,
        })
      },
    })
  })
}
