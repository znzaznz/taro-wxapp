/**
 * 微信小程序用不来uuid,自己写一个
 */
const uuid = () => {
    const s: string[] = [];
    const hexDigits = "xiaoznzwxapp";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] as string & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("")
}


// 判断变量的值是否为空
const isEmpty = (v, shallow = false) => {
    switch (typeof v) {
        case 'undefined':
            return true
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
            break
        case 'boolean':
            if (!v) return true
            break
        case 'number':
            if (isNaN(v)) return true
            break
        case 'object':
            if (null === v || v.length === 0) return true
            if (shallow) return false
            else {
                const length = Object.keys(v).length
                let count = 0
                Object.keys(v).map(item => {
                    if (!(v[item]) || v[item].length === 0) count++
                })
                return length === count
            }
        default:
            return false
    }
}

export {
    uuid,isEmpty
}


