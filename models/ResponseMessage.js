var status = require('./Status');
/**
 * @param code  响应状态码 （0 成功 其他为异常状态码）
 * @param msg   提示
 * @param data  二级响应参数 根据实际调用的接口进行响应
 * @param ext   二级响应参数 扩展字段
 * @constructor
 */

function ResponseMessage() {
    this.code;
    this.msg;
    this.data;
    this.ext;
    this.success = function (data, ext) {
        this.code = status.SUCCESS;
        this.msg = '操作成功';
        this.data = data;
        this.ext = ext;
        return this;
    };
    this.exception = function (code,ext) {
        this.code = code;
        this.msg = '操作失败';
        this.ext = ext;
        return this;
    }
}

module.exports = ResponseMessage;
