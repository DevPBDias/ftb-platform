import { historyData } from "@/constants/historyData";
import React from "react";
import HistoryCard from "./HistoryCard";

const HistorySection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-60 mt-[550px] mb-24 gap-24">
      {historyData.map((item, index) => (
        <HistoryCard key={index} data={item} />
      ))}
    </div>
  );
};

export default HistorySection;
