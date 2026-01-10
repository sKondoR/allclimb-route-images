import { GRADES_COLORS } from "@/shared/constants/allclimb";

type IRouteBadge = {
  grade: string;
};

const RouteBadge = ({
  grade, 
}: IRouteBadge) => {
  const formattedGrade = grade.toLowerCase();
  const bg = GRADES_COLORS[formattedGrade.slice(0, 2)];
  return (
    <span className="w-17 h-17 rounded-full text-xl inline-block text-center text-white bold pt-5" style={{ background: bg }}>{formattedGrade}</span>
  );
};

export default RouteBadge;
