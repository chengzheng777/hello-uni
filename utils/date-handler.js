/*
 * @Description: 工具类函数 - 日期处理器
 * @Author: LXG
 * @Date: 2022-01-26
 * @Editors: LXG
 * @LastEditTime: 2022-02-17
 */

const WEEKDAY_MAP = new Map([
    [0, '日'],
    [1, '一'],
    [2, '二'],
    [3, '三'],
    [4, '四'],
    [5, '五'],
    [6, '六'],
    [7, '日']
])

/**
 * @description: 格式化
 * @param {Date|string|number} value 待格式化的值
 * @param {string|Function} [formatter = 'Date'] formatter 格式 -
 *     'Date': Date
 *     'date': 'YYYY-MM-DD'
 *     'datetime': 'YYYY-MM-DD HH:mm:ss'
 *     'time': 'HH:mm:ss'
 * 
 *     '%YYYY%' => 年份
 *     '%MM%' => 月份(补0)    '%M%' => 月份
 *     '%DD%' => 日(补0)    '%D%' => 日
 *     '%HH%' => 时(24时间制，补0)    '%H%' => 时(24时间制)
 *     '%mm%' => 分(补0)    '%m%' => 分
 *     '%ss%' => 秒(补0)    '%s%' => 秒
 *     '%WD%' => 周几(中文)    '%wd%' => 周几
 *     '%AP%' => 时段(中文)    '%ap%' => 时段(英文)
 *     '%hh%' => 时(12时间制，补0)    '%h%' => 时(12时间制)
 * @param {object} option 选项
 * @returns {Date|string} 格式化后的值
 */
function format(value, formatter = 'Date', option = {}) {
    if (!value) {
        console.warn(`format: can't find value.`)
        return;
    }

    // 兼容性处理
    if (typeof value === 'string') {
        if (/^\d{1,4}(-\d{1,4}){1,2}($|\s\d{1,2}:\d{1,2}(:\d{1,2})?$)/.test(value)) {
            value = value.replace(/-/gm, '/')
        }
        if (/^[\d\-]+T[\d:]+.\d+\+0800$/.test(value)) {
            value = value.replace(/-/gm, '/').replace(/T/, ' ').split('.')[0]
        }
    }

    let newDate = new Date(value)
    if (isNaN(newDate.getTime())) {
        console.warn(`format: invalid date.`)
        return;
    }

    if (formatter === 'Date') return newDate;

    let opts = {}
    opts.YYYY = newDate.getFullYear()
    opts.M = newDate.getMonth() + 1
    opts.MM = opts.M.toString().padStart(2, '0')
    opts.D = newDate.getDate()
    opts.DD = opts.D.toString().padStart(2, '0')
    opts.H = newDate.getHours()
    opts.HH = opts.H.toString().padStart(2, '0')
    opts.m = newDate.getMinutes()
    opts.mm = opts.m.toString().padStart(2, '0')
    opts.s = newDate.getSeconds()
    opts.ss = opts.s.toString().padStart(2, '0')

    if (formatter === 'date') {
        return `${opts.YYYY}-${opts.MM}-${opts.DD}`;
    }
    if (formatter === 'datetime') {
        return `${opts.YYYY}-${opts.MM}-${opts.DD} ${opts.HH}:${opts.mm}:${opts.ss}`;
    }
    if (formatter === 'time') {
        return `${opts.HH}:${opts.mm}:${opts.ss}`;
    }

    opts.WD = undefined
    opts.wd = newDate.getDay() || 7
    opts.AP = undefined
    opts.ap = undefined
    opts.h = undefined
    opts.hh = undefined

    try {
        let intlDtff = new Intl.DateTimeFormat('zh-CN', {
            hour12: true,
            weekday: 'narrow',
            hour: 'numeric',
        }).format(newDate)
        let matchRes = intlDtff.match(/^(.+)\s(\D+(?=\d))(\d+).+$/)
        if (matchRes) {
            opts.WD = matchRes[1]
            opts.AP = matchRes[2]
            opts.AP === '上午' && (opts.ap = 'am');
            opts.AP === '下午' && (opts.ap = 'pm');
            opts.h = Number(matchRes[3])
            opts.hh = opts.h.toString().padStart(2, '0')
        }
    } catch (error) {
        opts.WD = WEEKDAY_MAP.get(opts.wd)
        opts.AP = opts.H <= 12 ? '上午' : '下午'
        if (opts.H <= 12) {
            opts.AP = '上午'
            opts.ap = 'am'
        } else {
            opts.AP = '下午'
            opts.ap = 'pm'
        }
        opts.h = opts.H % 12
        opts.hh = opts.h.toString().padStart(2, '0')
    }

    if (typeof formatter === 'string') {
        for (const [k, v] of Object.entries(opts)) {
            let re = new RegExp('%' + k + '%', 'gm')
            formatter.match(re) && (formatter = formatter.replace(re, v));
        }
        return formatter;
    }

    if (typeof formatter === 'function') {
        return formatter(newDate, opts);
    }
}

/**
 * @description: 获取近期某一刻的日期
 * @param {Date|string|number} [current = new Date()] current 当天
 * @param {object} option 选项
 * @param {number|string} option.year N年前后
 * @param {number|string} option.month N个月前后
 * @param {number|string} option.day N天前后
 * @param {number|string} option.hour N小时前后
 * @param {number|string} option.minute N分钟前后
 * @param {number|string} option.second N秒前后
 * @returns {Date} 近期的日期
 */
function getRecent(current = new Date(), option = {}) {
    let newDate = format(current)
    if (!newDate) return;

    newDate.setFullYear(
        newDate.getFullYear() + (parseInt(option.year) || 0),
        newDate.getMonth() + (parseInt(option.month) || 0),
        newDate.getDate() + (parseInt(option.day) || 0)
    )
    newDate.setHours(
        newDate.getHours() + (parseInt(option.hour) || 0),
        newDate.getMinutes() + (parseInt(option.minute) || 0),
        newDate.getSeconds() + (parseInt(option.second) || 0)
    )
    return newDate;
}

export {
    format,
    getRecent,
}