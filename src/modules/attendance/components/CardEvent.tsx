import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

interface CardEventProps {
  date: string;
  title: string;
  location: string;
  professor: string;
}

const CardEvent: React.FC<CardEventProps> = ({ date, title, location, professor }) => {
  return (
    <div className="bg-primary text-white rounded-lg p-4 w-80 shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-1/2 bg-blue-700 opacity-20 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 h-full w-1/3 bg-blue-700 opacity-20 rounded-full transform translate-x-1/3 translate-y-1/2"></div>

      <div className="mb-4">
        <span className="bg-white text-secondary px-3 py-1 rounded-full text-sm font-semibold">
          {date}
        </span>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="flex flex-col gap-2 text-sm">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-white" /> {location}
          </p>
          <p className="flex items-center gap-2">
            <FaUser className="text-white" /> {professor}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
