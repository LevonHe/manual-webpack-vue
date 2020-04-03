// 登录账号：邮箱/手机号码
export const AccountReg = /^((\w-*\.*)+@(\w-?)+(\.\w{2,})+)|([1][3,4,5,7,8,9][0-9]{9})$/;
// 密码：8～20位，必须同时包含字母、数字及除去回车、空格、TAB的特殊符号
export const PasswordReg = /^(?=.*\d)(?=.*[A-Za-z])(?!.*\s)(?=.*[^A-Za-z0-9]+)\S*$/;
// 手机号，严格
export const phoneStrict = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
// 手机号，宽松
export const phoneRelax = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
// 座机
export const landline = /\d{3}-\d{8}|\d{4}-\d{7}/;
// 邮箱
export const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// 经度：取值范围0-180,保留0-6位小数
export const LongitudeReg = /^[+-]?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
// 纬度：取值范围0-90,保留0-6位小数
export const LatitudeReg = /^[+-]?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
// 正整数
export const positiveInteger = /^\d+$/;
// 非负浮点数
export const positiveFloat = /^\d+(\.\d+)?$/;
// 浮点数
export const Float = /^-?\d+(\.\d+)?$/;
// 不能包含字母
export const noWord = /^[^A-Za-z]*$/;
// 中国邮政编码
export const postCode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
// 微信号：6-20位，以字母开头，由字母、数字、中划线、下划线组成
export const weChatNumber = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
// 16进制颜色
export const color16 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
// 火车车次
export const trainNumber = /^[GCDZTSPKXLY1-9]\d{1,4}$/;
// 手机机身码
export const IMEI = /^\d{15,17}$/;
// 必须带端口的url
export const httpAndPort = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/;
// 网址，支持端口和query参数
export const website = /^((ht|f)tps?):\/\/?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
// 统一社会信用代码
export const creditCode = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
// 迅雷链接
export const thunderLink = /^thunderx?:\/\/[a-zA-Z\d]+=$/;
// ed2k链接
export const ed2kLink = /^ed2k:\/\/\|file\|.+\|\/$/;
// 磁力链接
export const magnetLink = /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/;
// 子网掩码
export const subnetMask = /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
// linux文件夹路径
export const linuxFolderPath = /^(\/[^/]+)+\/?$/;
// linux文件夹路径
export const linuxFilePath = /^(\/[^/]+)+$/;
// windows文件夹路径
export const windowsFolderPath = /^[a-zA-Z]:\\(?:\w+\\?)*$/;
// windows文件夹路径
export const windowsFilePath = /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/;
// 股票代码（A股）
export const ashare = /(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/;
// X.Y.Z
export const version3 = /^\d+(?:\.\d+){2}$/;
// 视频链接地址
export const videoUrl = /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/;
// 图片链接地址
export const imageUrl = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/;
// 银行卡号
export const accountNumber = /^[1-9]\d{9,29}$/;
// 中文姓名
export const chineseName = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
// 英文姓名
export const englishName = /^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$/;
// 车牌号（新能源+非新能源）
export const licensePlateNumberNER = /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/;
// 身份证号码(1代和2代)
export const idCard = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
