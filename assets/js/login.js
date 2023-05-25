$(function () {
    $('#link_reg').click(function() {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('#link_login').click(function() {
        $('.regBox').hide()
        $('.loginBox').show()
    })

    // 自定义密码正则
    let form = layui.form

    form.verify({
        password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repeatPassword: function(value) {
            let password = $('.regBox [name=password]').val()
            if(password !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册事件
    $('#form_reg').submit(function(e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }, function(res) {
            if(res.status !== 0) {
                return alert('注册失败：' + res.message)
            }
            alert('注册成功')
            $('#link_login').click()
        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.post('/api/login', {
            username: $('#form_login [name="username"]').val(),
            password: $('#form_login [name="password"]').val()
        }, function(res) {
            if(res.status !== 0) {
                return alert(res.message)
            }
            alert('登录成功')
            localStorage.setItem('BigEventToken', res.token)
            location.href = '../../index.html'
        })
    })

})

