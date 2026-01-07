import { GRADES_COLORS } from "@/shared/constants/allclimb";

export type IRouteBadge = {
  grade: string;
};

const RouteBadge = ({
  grade, 
}: IRouteBadge) => {
  const bg = GRADES_COLORS[grade.slice(0, 2)];
  return (
    <span className="w-17 h-17 rounded-full text-xl mr-1 inline-block text-center text-white bold pt-5" style={{ background: bg }}>{grade}</span>
  );
};

export default RouteBadge;
