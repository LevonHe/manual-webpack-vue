// 邮箱/手机号
export const ACCOUNT_REG = /^((\w-*\.*)+@(\w-?)+(\.\w{2,})+)|([1][3,4,5,7,8,9][0-9]{9})$/;
// 邮箱
export const EMAIL_REG = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
// 手机号码
export const TELEPHONE_REG = /^[1][3,4,5,7,8,9][0-9]{9}$/;
// 经度：取值范围0-180, 保留0-6位小数
export const LONGITUDE_REG = /^[+-]?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
// 纬度：取值范围0-90, 保留0-6位小数
export const LATITUDE_REG = /^[+-]?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
// 正整数
export const POSITIVE_INTEGER_REG = /^\d+$/;
// 非负浮点数，小数点前最多6位，小数点后最多10位
export const POSITIVE_FLOAT_REG = /^\d{1,6}(\.[\d]{0,10})?$/;
// 浮点数，小数点前最多6位，小数点后最多10位
export const FLOAT_REG = /^-?\d{1,6}(\.[\d]{0,10})?$/;
