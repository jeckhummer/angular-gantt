function DelayedResponse(successData, errorData) {
    this.getSuccessData = function () {
        return successData;
    };

    this.getErrorData = function () {
        return errorData;
    };
}