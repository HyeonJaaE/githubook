const printDate = (s: string) => {
    let now = new Date(),
        foo = new Date(s),
        diff = now.getTime() - foo.getTime(),
        hourDiff = Math.floor(diff / 3600000),
        minDiff = Math.floor((diff % 3600000) / 60000),
        dayli = ["일요일 ", "월요일 ", "화요일 ", "수요일 ", "목요일 ", "금요일 ", "토요일 "],
        hour = foo.getHours(),
        min = foo.getMinutes(),
        isAm = true,
        bar = [];

    if (hour > 12) {
        isAm = false;
        hour -= 12;
    }

    // [년, 월, 일, 요일, 시간, :, 분]
    bar = [
        foo.getFullYear() + "년 ",
        foo.getMonth() + 1 + "월 ",
        foo.getDate() + "일 ",
        dayli[foo.getDay()],
        isAm ? "오전 " : "오후 ",
        String(hour).length === 1 ? "0" + hour : hour,
        ":",
        min < 10 ? "0" + min : min,
    ];

    return diff > 86400000
        ? [bar]
        : hourDiff > 0
        ? [bar, hourDiff + "시간 전"]
        : [bar, minDiff + "분 전"];
};

export default printDate;
