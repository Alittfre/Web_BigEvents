$(function () {
    let layer = layui.layer
    let form = layui.form
    initCates()
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    let $image = $('#image')

    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    function initCates() {
        $.ajax({
            method: 'GET',
            url: '/my/artcate/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    $('#chooseCover').click(function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change', function (e) {
        let file = e.target.files[0]
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })

    let art_state = '已发布'
    $('#saveToDarft').click(() => {
        art_state = '草稿'
    })

    $('#art_pub').submit(function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.msg)
                        }
                        layer.msg('发布成功')
                    }
                })

            })
    })
})