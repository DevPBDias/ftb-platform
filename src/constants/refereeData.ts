import { StaticImageData } from "next/image";
import refereeImage1 from "@/assets/avatar1.png";
import refereeImage2 from "@/assets/avatar2.png";
import refereeImage3 from "@/assets/avatar2.png";
import refereeImage4 from "@/assets/avatar4.png";
import refereeImage5 from "@/assets/avatar1.png";
import refereeImage6 from "@/assets/avatar3.png";

export type RefereeData = {
  id: number;
  name: string;
  experience: number;
  jobFunction?: string;
  image: StaticImageData;
};

export const refereeData: RefereeData[] = [
  {
    id: 1,
    name: "John Doe",
    experience: 5,
    jobFunction: "Senior Referee",
    image: refereeImage1,
  },
  {
    id: 2,
    name: "Jane Smith",
    experience: 3,
    jobFunction: "Assistant Referee",
    image: refereeImage2,
  },
  {
    id: 3,
    name: "Mike Johnson",
    experience: 7,
    jobFunction: "Referee Supervisor",
    image: refereeImage3,
  },
  {
    id: 4,
    name: "Emily Davis",
    experience: 4,
    jobFunction: "Junior Referee",
    image: refereeImage4,
  },
  {
    id: 5,
    name: "Chris Brown",
    experience: 6,
    jobFunction: "Senior Referee",
    image: refereeImage5,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    experience: 2,
    jobFunction: "Assistant Referee",
    image: refereeImage6,
  },
  {
    id: 7,
    name: "David Lee",
    experience: 8,
    jobFunction: "Referee Supervisor",
    image: refereeImage1,
  },
  {
    id: 8,
    name: "Laura Green",
    experience: 5,
    jobFunction: "Junior Referee",
    image: refereeImage2,
  },
  {
    id: 9,
    name: "James White",
    experience: 4,
    jobFunction: "Senior Referee",
    image: refereeImage3,
  },
  {
    id: 10,
    name: "Olivia Brown",
    experience: 3,
    jobFunction: "Assistant Referee",
    image: refereeImage4,
  },
];
