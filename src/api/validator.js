// 数据验证库
// 兼容表单验证

class Validator {
    constructor(){
        this.errorMessage = {
            required: '这是必填字段。',
            email: '请输入有效的电子邮件地址。',
            phone: '请输入11位的手机号码。',
            url: '请输入有效的网址。',
            date: '请输入有效的日期。',
            dateISO: '请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。',
            number: '请输入有效的数字。',
            digits: '只能输入数字。',
            idcard: '请输入18位的有效身份证。',
            equalTo: '输入值必须和 {0} 相同。',
            contains: '输入值必须包含 {0}。',
            minlength: '最少要输入 {0} 个字符。',
            maxlength: '最多可以输入 {0} 个字符。',
            rangelength: '请输入长度在 {0} 到 {1} 之间的字符。',
            min: '请输入不小于 {0} 的数值。',
            max: '请输入不大于 {0} 的数值。',
            range: '请输入范围在 {0} 到 {1} 之间的数值。',
        }
    }
    /**
     * 验证必填元素
     */
    required(value) {
        if (typeof value === 'number') {
            value = value.toString()
        } else if (typeof value === 'boolean') {
            return true
        }

        return value.length > 0
    }
    /**
     * 验证电子邮箱格式
     */
    email(value) {
      return !this.required(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
    }
    /**
     * 验证手机格式
     */
    phone(value) {
        return !this.required(value) || /^1[345789]\d{9}$/.test(value)
    }
    /**
     * 验证URL格式
     */
    url(value) {
        return !this.required(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
    }
    /**
     * 验证日期格式
     */
    date(value) {
        return !this.required(value) || !/Invalid|NaN/.test(new Date(value).toString())
    }
    /**
     * 验证ISO类型的日期格式
     */
    dateISO(value) {
        return !this.required(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
    }
    /**
     * 验证十进制数字
     */
    number(value) {
        return !this.required(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
    }
    /**
     * 验证整数
     */
    digits(value) {
        return !this.required(value) || /^\d+$/.test(value)
    }
    /**
     * 验证身份证号码
     */
    idcard(value) {
        return !this.required(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
    }
    /**
     * 验证两个输入框的内容是否相同
     */
    equalTo(value, param) {
        return value === param
    }
    /**
     * 验证是否包含某个值
     */
    contains(value, param) {
        return value.indexOf(param) >= 0
    }
    /**
     * 验证最小长度
     */
    minlength(value, param) {
        return value.length >= param
    }
    /**
     * 验证最大长度
     */
    maxlength(value, param) {
        return value.length <= param
    }
    /**
     * 验证一个长度范围[min, max]
     */
    rangelength(value, min, max) {
        return (value.length >= min && value.length <= max)
    }
    /**
     * 验证最小值
     */
    min(value, param) {
        return value >= param
    }
    /**
     * 验证最大值
     */
    max(value, param) {
        return value <= param
    }
    /**
     * 验证一个值范围[min, max]
     */
    range(value, min, max) {
        return (value >= min && value <= max)
    }

    /**
     * 验证单一规则
     * params：
     * data: 要验证的数据
     * rule: String 验证规则
     * message: String 验证失败时的提示消息，如果不赋值则提示默认消息。
     * 
     * usage: 
     * validateRule('13611113333', 'phone', message: "输入电话方便快递员联系您。")
     * 
     * return：
     * {result: false, rule: 'required', message: "输入电话方便快递员联系您。"}
     */
    validateRule(data, rule, message) {
        let res = {rule};
        res.result = this[rule](data);
        
        if (!res.result)
            res.message = message || this.errorMessage[rule];
        
        return res;
    }
    /**
     * 验证多个规则
     * params：
     * data: 要验证的数据
     * rules: Array 验证规则列表
     *  - rule: String 验证规则
     *  - message: String 验证失败时的提示消息，如果不赋值则提示默认消息。
     * 
     * usage:
     * validateRules('13611113333', [
     *  {rule: 'required', message: '输入电话方便快递员联系您。'},
     *  {rule: 'phone'},
     * ])
     * 
     * return：
     * {result: false, rule: 'required' , message: "输入电话方便快递员联系您。"}
     */
    validateRules(data, rules) {
        for (const item of rules) {
            let res = this.validateRule(data, item.rule, item.message);
            if (!res.result) {
                return res
            }
        }
        return {result: true}
    }
}

export default Validator