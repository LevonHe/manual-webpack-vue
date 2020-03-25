// 登录账号：邮箱/手机号码
export const AccountReg = /^((\w-*\.*)+@(\w-?)+(\.\w{2,})+)|([1][3,4,5,7,8,9][0-9]{9})$/;
// 邮箱
export const EmailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
// 手机号码
export const TelephoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
// 密码：8～20位，必须同时包含字母、数字及除去回车、空格、TAB的特殊符号
export const PasswordReg = /^(?=.*\d)(?=.*[A-Za-z])(?!.*\s)(?=.*[^A-Za-z0-9]+)\S*$/;
// 经度：取值范围0-180,保留0-6位小数
export const LongitudeReg = /^[+-]?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
// 纬度：取值范围0-90,保留0-6位小数
export const LatitudeReg = /^[+-]?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
// url：以http开头
export const HttpUrlReg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\\/=\\?%\-&_~`@[\]\\':+!]*([^<>\\"\\"])*$/;
// 版本号：格式如a.b.c，a、b、c由最大4位数字组合
export const VersionReg = /^[0-9]+\.\d+\.\d+$/; // 版本号：格式如a.b.c，a、b、c由最大4位数字组合
// 标识符：1～32位，字符：英文、"_-"、数字、允许中间有空格
export const IdentifierReg = /^[A-Za-z0-9_-](([A-Za-z0-9_-\s]{0,30}[A-Za-z0-9_-])|([A-Za-z0-9_-]{0,31}))$/;
// 通用：允许中间有空格
export const TrimReg = /^\S((.{0,253}\S)|(\S{0,254}))$/;
// 用户名：8～32位，字符：由8~32位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const UserNameReg = /^\S((.{6,30}\S)|(\S{7,31}))$/;
// 名称：1～32位，字符：由1~32位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const Name32Reg = /^\S((.{0,30}\S)|(\S{0,31}))$/;
// 名称：1～64位，字符：由1~64位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const Name64Reg = /^\S((.{0,62}\S)|(\S{0,63}))$/;
// 设备序列号：1～32位，英文、数字、中划线、下划线、点、@
export const DeviceSerialNumberReg = /^[a-zA-Z0-9.-_@]{1,32}$/;
// 正整数
export const positiveInteger = /^\d+$/;
// 非负浮点数
export const positiveFloat = /^\d+(\.\d+)?$/;
// 浮点数
export const Float = /^-?\d+(\.\d+)?$/;
// 工况名称：1~32位，字符：由1~32位英文字母、数字、@、点、下划线、中划线(除回车、TAB外)组成
export const ConditionNameReg = /^\S((.{0,30}\S)|(\S{0,31}))$/;
// 传动比
export const RatioReg = /^\d+(\.\d+)?[:：]\d+(\.\d+)?$/;
