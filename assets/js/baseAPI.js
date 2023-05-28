$(function () {
    $.ajaxPrefilter(function(options) {
        options.url = `http://127.0.0.1:3007${options.url}`
        if(options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('BigEventToken') || ''
            }
        }
        options.complete = function(res) {
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                alert('验证用户token失败')
                localStorage.removeItem('BigEventToken')
                return location.href = '../../login.html'
            }
        }    
    })
})