$(function() {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samePwd: function(val) {
            if(val === $('[name=pwd]').val()){
                return '新旧密码不能相同'
            }
        }
    })

    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('[name=pwd]').val(),
                newPwd: $('[name=newPwd]').val()
            },
            success: function(res) {
                console.log(res)
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})