$(function() {
    getUserToken()
    let layer = layui.layer
    // 退出按钮功能
    $('.exitBtn').click(function() {
        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('BigEventToken')
            location.href = '../../login.html'
            layer.close(index);
          });
    })
})

function getUserToken() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (response) {
            if(response.status !== 0) {
                return
            }
            getUserInfo(response.data.nickname, response.data.username, response.data.user_pic)
        }
    });
}

function getUserInfo(nickname, username, user_pic) {
    let name = nickname || username
    if(user_pic) {
        $('.text-avatar').hide()
        $('.layui-nav-img')
        .attr('src', user_pic)
        .show()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0])
        .show()
    }

    $('#welcome').text(`欢迎 ${name}`)
}

