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
