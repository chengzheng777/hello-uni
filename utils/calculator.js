/*
 * @Description: 工具类函数 - 计算器
 * @Author: LXG
 * @Date: 2022-02-15
 * @Editors: LXG
 * @LastEditTime: 2022-02-16
 */

/**
 * @description: 加法运算
 * @param {...(number|string)} 参与计算的值
 * @returns {number} 运算结果值
 */
function add() {
    let args = [...arguments]
    if (!args.length) return 0;
    if (args.length === 1) return parseFloat(args[0]) || 0;
    let decimal = 0
    return args.reduce((ac, cv) => {
        let cvNum = parseFloat(cv)
        if (Number.isNaN(cvNum)) return ac;

        decimal = Math.max(decimal, (cvNum.toString().split('.')[1] || '').length)
        if (decimal === 0) return ac + cvNum;

        let mult = Math.pow(10, decimal)
        return ((ac * mult) + (cvNum * mult)) / mult;
    }, 0)
}

/**
 * @description: 乘法运算
 * @param {...(number|string)} 参与计算的值
 * @returns {number} 运算结果值
 */
function mul() {
    let args = [...arguments]
    if (!args.length) return 0;
    if (args.length === 1) return parseFloat(args[0]) || 0;
    let decimal = 0
    return args.reduce((ac, cv) => {
        let cvNum = parseFloat(cv)
        if (Number.isNaN(cvNum)) return ac;

        decimal = Math.max(decimal, (cvNum.toString().split('.')[1] || '').length)
        if (decimal === 0) return ac * cvNum;

        let mult = Math.pow(10, decimal)
        return ((ac * mult) * (cvNum * mult)) / Math.pow(mult, 2);
    }, 1)
}

export default {
    add,
    mul,
}
export {
    add,
    mul,
}