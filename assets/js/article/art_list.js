$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    // 定义查询数据对象
    let custQuery = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initArtList(custQuery)
    getCatesList()
    template.defaults.imports.dateFormat = function (date) {
        const dt = new Date(date)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    function padZero(n) {
        return n > 9 ? n : `0${n}`
    }


    function initArtList(query) {
        if (query.cate_id === '') {
            delete query.cate_id
        } else {
            query.cate_id = Number.parseInt(query.cate_id)
        }
        if (query.state === '') {
            delete query.state
        }
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: query,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })

        custQuery = {
            pagenum: query.pagenum,
            pagesize: query.pagesize,
            cate_id: '',
            state: ''
        }

    }

    function getCatesList() {
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

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            curr: custQuery.pagenum,
            limit: custQuery.pagesize,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],      
            jump: function(obj, first) {
                custQuery.pagenum = obj.curr
                custQuery.pagesize = obj.limit
                if(!first) {
                    initArtList(custQuery)
                }
            }
        })
    }

    $('#form-search').submit(function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        custQuery.cate_id = cate_id
        custQuery.state = state
        initArtList(custQuery)
    })

    $('tbody').on('click', '.btn-edit', function () {
        getCatesList()
        indexEdit = layer.open({
            type: 1,
            area: ['800px', '300px'],
            title: '编辑文章',
            content: $('#dialog-edit').html()
        });
        form.render()
    })

    $('tbody').on('click', '.btn-delete', function() {
        let len = $('.btn-delete').length
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除文章失败！')
              }
              layer.msg('删除文章成功！')
              if (len === 1) {
                custQuery.pagenum = custQuery.pagenum === 1 ? 1 : custQuery.pagenum - 1
              }
              initArtList(custQuery)
            }
          })
          layer.close(index)
        })
      })
    
})