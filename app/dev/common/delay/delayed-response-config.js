function DelayedResponseConfig(delay, isErrorResponse) {
    this.getDelay = function () {
        return delay;
    };

    this.getIsErrorResponse = function () {
        return isErrorResponse;
    }
}