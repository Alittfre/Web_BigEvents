$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return "长度必须在1~6个字符之间"
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val("formUserInfo", res.data);
            }
        })
    }

    $('#resetBtn').click(function(e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: {
                id: $('[name=id]').val(),
                nickname: $('[name=nickname]').val(),
                email: $('[name=email]').val()
            },
            success: function(res) {
                console.log(res)
                if(res.status !== 0) {
                    return layer.msg('更新用户数据失败')
                }
                layer.msg('更新用户数据成功')
            }
        })

        window.parent.getUserToken()
    })
})