function PagingInfo() {
    this.totalCount;
    this.pageNumber;
    this.pageSize;
    this.data;
    this.success = function (totalCount, pageNumber, pageSize, data) {
        this.totalCount = totalCount;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.data = data;
        return this;
    }
}

module.exports = PagingInfo;
