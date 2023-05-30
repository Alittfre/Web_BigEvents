$(function () {
    let layer = layui.layer
    let form = layui.form
    let indexAdd = null
    let indexEdit = null
    initArtCate()

    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/artcate/cates',
            success: function (res) {
                let htmlStr = template("tpl-table", res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#btnAddCate').click(function () {
        indexAdd = layer.open({
            type: 1,
            area: ['550px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/artcate/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCate()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['550px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        let id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/artcate/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
                console.log(res)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/artcate/updatecate',
            data: {
                id: $('#form-edit [name=id]').val(),
                name: $('#form-edit [name=name]').val(),
                alias: $('#form-edit [name=alias]').val()
            },
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改成功')
                layer.close(indexEdit)
                initArtCate()
            }
        })
    })
    // 删除按钮功能，事件代理要用on
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/artcate/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    initArtCate()
                }
            })
            layer.close(index);
        })
    })
})