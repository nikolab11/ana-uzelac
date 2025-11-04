"use client";

import { useEffect, useState } from "react";
import {
  differenceInCalendarDays,
  interval,
  intervalToDuration,
  parseISO,
} from "date-fns";

interface Props {
  labels: string[];
}

const targetDate = parseISO("2025-12-03");

export function CountdownTimer(props: Props) {
  const [difference, setDifference] = useState([0, 0, 0, 0] as [
    number,
    number,
    number,
    number
  ]);

  useEffect(() => {
    const int = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration(interval(now, targetDate));
      const days = differenceInCalendarDays(targetDate, now);
      setDifference([
        days,
        duration.hours || 0,
        duration.minutes || 0,
        duration.seconds || 0,
      ] as const);
    }, 1000);
    return () => {
      clearInterval(int);
    };
  }, []);

  return (
    <div className="flex gap-2 md:gap-4 pt-5 flex-wrap">
      {difference.map((value, index) => {
        return (
          <div key={index}>
            <div
              className={
                "p-2 md:p-3 bg-white min-w-12 md:min-w-14 flex justify-center items-center text-[#DBAC50] text-lg md:text-2xl bodoni font-bold"
              }
            >
              {value}
            </div>
            <div className={"text-center pt-2 text-[#444444] text-xs md:text-sm"}>
              {props.labels[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
