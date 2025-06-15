import React, { useState, useEffect } from 'react';

function Clock() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    function checkTime(i) {
      return i < 10 ? '0' + i : i;
    }

    function updateTime() {
      const today = new Date();
      const weekday = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ];

      const day = weekday[today.getDay()];
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();

      m = checkTime(m);
      s = checkTime(s);
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const nowTime = `${h} giờ ${m} phút ${s} giây`;
      const fullDate = `${day}, ${dd}/${mm}/${yyyy}`;

      setTimeString(`${fullDate} - ${nowTime}`);
    }

    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  return <span className="date">{timeString}</span>;
}

export default Clock;
