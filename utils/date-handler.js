/*
 * @Description: 工具类函数 - 日期处理器
 * @Author: LXG
 * @Date: 2022-01-26
 * @Editors: LXG
 * @LastEditTime: 2022-01-26
 */

/**
 * @description: 格式化
 * @param {Date|string|number} value 待格式化的值
 * @param {string} [formatter = 'Date'] formatter 格式 -
 *     'Date': Date
 *     'date': 'YYYY-MM-DD'
 *     'datetime': 'YYYY-MM-DD hh:mm:ss'
 *     'time': 'hh:mm:ss'
 * 
 *     '%YYYY%' => 年份
 *     '%MM%' => 月份(补0)
 *     '%M%' => 月份
 *     '%DD%' => 日(补0)
 *     '%D%' => 日
 *     '%hh%' => 时(补0)
 *     '%h%' => 时
 *     '%mm%' => 分(补0)
 *     '%m%' => 分
 *     '%ss%' => 秒(补0)
 *     '%s%' => 秒
 * @return {Date|string}
 */
function format(value, formatter = 'Date') {
    if (!value) {
        console.warn(`format: can't find value.`)
        return;
    }

    // 兼容性处理
    if (typeof value === 'string') {
        if (/^\d{1,4}(-\d{1,4}){1,2}($|\s\d{1,2}:\d{1,2}(:\d{1,2})?$)/) {
            value = value.replace(/-/gm, '/')
        }
        if (/^[\d\-]+T[\d:]+.\d+\+0800$/) {
            value = value.replace(/-/gm, '/').replace(/T/, ' ').split('.')[0]
        }
    }

    let temp = new Date(value)
    if (isNaN(temp.getTime())) {
        console.warn(`format: invalid date.`)
        return;
    }

    if (formatter === 'Date') return temp;

    let opts = {}
    opts.YYYY = temp.getFullYear()
    opts.M = temp.getMonth() + 1
    opts.MM = opts.M.toString().padStart(2, '0')
    opts.D = temp.getDate()
    opts.DD = opts.D.toString().padStart(2, '0')
    opts.h = temp.getHours()
    opts.hh = opts.h.toString().padStart(2, '0')
    opts.m = temp.getMinutes()
    opts.mm = opts.m.toString().padStart(2, '0')
    opts.s = temp.getSeconds()
    opts.ss = opts.s.toString().padStart(2, '0')

    // console.log(opts)

    if (formatter === 'date') {
        return `${opts.YYYY}-${opts.MM}-${opts.DD}`;
    }
    if (formatter === 'datetime') {
        return `${opts.YYYY}-${opts.MM}-${opts.DD} ${opts.hh}:${opts.mm}:${opts.ss}`;
    }
    if (formatter === 'time') {
        return `${opts.hh}:${opts.mm}:${opts.ss}`;
    }

    if (typeof formatter === 'string') {
        for (const [k, v] of Object.entries(opts)) {
            formatter = formatter.replace(new RegExp('%' + k + '%', 'gm'), v)
        }
        return formatter;
    }
}

export {
    format,
}