import http from './middleware'

const callbackFn = (res, fn, Errfn) => {
    if (res.data.code === 1 || res.data.code === 200 || res.data.errno === 200) {
        fn && fn(res)
    } else {
        if (Errfn) {
            Errfn(res)
        } else {
            //error 处理
        }
    }
}

let axios = (...rest) => {
    let fn = rest[0][1];
    let Errfn = rest[0][2];
    if (typeof rest[0][0] === "function") {
        fn = rest[0][0];
        Errfn = rest[0][1];
        return http.request({
            url: rest[0].url,
            method: rest[0].method
        }).then(res => {
            callbackFn(res, fn, Errfn)
        })
    } else {
        if (rest[0].method === 'get') {
            return http.request({
                url: rest[0].url,
                method: rest[0].method,
                params: rest[0][0],
            }).then(res => {
                callbackFn(res, fn, Errfn)
            })
        } else if (rest[0].method === 'post') {
            return http.request({
                url: rest[0].url,
                method: rest[0].method,
                data: rest[0][0]
            }).then(res => {
                callbackFn(res, fn, Errfn)
            })
        } else {
            return http.request({
                url: rest[0].url,
                method: 'get',
            }).then(res => {
                callbackFn(res, fn, Errfn)
            })
        }
    }
}

export default axios