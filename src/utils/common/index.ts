import { ITime } from "../../interfaces/counter";

export const onClickWebsite = (url: string) => window.open(url, "_blank");

export const throttle = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      callback();
      timer = null;
    }, delay);
  };
};

export const diffDay = (mintingDate: string): ITime => {
  //make this date: SAT, Aug 27th - 2pm PST
  // 2022년 8월 27일 오후 2시 PST
  const date = new Date(mintingDate);
  // const date = new Date(2022, 7, 27, 14, 0, 0);
  // now pst date
  const now = new Date();

  const diff = Number(date) - Number(now);
  if (diff < 0) return { day: 0, hour: 0, min: 0, sec: 0 };

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);
  // console.log(diffDay, "|", diffHour, "|", diffMin, "|", diffSec);

  return { day: diffDay, hour: diffHour, min: diffMin, sec: diffSec };
};

// 아직 안쓰는 것들

const getUTC = (date: Date) => {
  const utcDate = new Date(date.getTime());
  utcDate.setMinutes(utcDate.getMinutes() + utcDate.getTimezoneOffset());
  return utcDate;
};

const getPST = (date: Date) => {
  const utcDate = getUTC(date);
  const HOUR = 3600000;
  // 왜 한시간 더 넣어야 하는지 모르겠어
  const timeDiff = 8 - 1; // UTC +8
  const pstDate = new Date(utcDate.getTime() + HOUR * -timeDiff);
  return pstDate;
};

const getFixedDate = (date: {
  mon: number;
  day: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
  timezone: "UTC" | "PST";
}) => {
  const { mon, day, year, hour, minute, second, timezone } = date;
  const _string = `${mon}/${day}/${year} ${hour}:${minute}:${second} ${timezone}`;

  const dt = new Date(_string);
  return dt;
};

const diffDay_v2 = (date1: Date, date2: Date): ITime => {
  const diff = date2.getTime() - date1.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((diff % (1000 * 60)) / 1000);
  return { day, hour, min, sec };
};

export const cutDecimalZero = (num: number, maxLenth: number): number => {
  const num2String = num.toString().slice(0, maxLenth);
  while (true) {
    if (num2String[num2String.length - 1] === "0") {
      num2String.slice(0, num2String.length - 1);
    } else {
      break;
    }
  }
  const num2Float = Number.parseFloat(num2String);
  return num2Float;
};

export const changeTimeZone = (date: Date, timeZone: string) => {
  if (typeof date === "string") {
    return new Date(
      new Date(date).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
};

export function getRPCErrorMessage(err: any) {
  var open = err.stack.indexOf("{");
  var close = err.stack.lastIndexOf("}");
  var j_s = err.stack.substring(open, close + 1);
  var j = JSON.parse(j_s);
  var reason = j.data[Object.keys(j.data)[0]].reason;
  return reason;
}
