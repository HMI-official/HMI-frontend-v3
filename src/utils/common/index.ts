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

export const diffDay = (): ITime => {
  //make this date: SAT, Aug 27th - 2pm PST
  // 2022년 8월 27일 오후 2시 PST
  const date = new Date("2022-08-27T14:00:00.000Z");

  // const date = new Date(2022, 7, 27, 14, 0, 0);
  // now pst date

  const now = new Date();

  const diff = Number(date) - Number(now);

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);
  // console.log(diffDay, "|", diffHour, "|", diffMin, "|", diffSec);

  return { day: diffDay, hour: diffHour, min: diffMin, sec: diffSec };
};
