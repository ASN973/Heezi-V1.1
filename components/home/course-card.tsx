import HomeHeader, { TitleBanner } from "@/components/home/HomeHeader";
import usePracticeToolConstants from "@/hooks/usePracticeToolConstants";

export default function CourseCard() {
  const { toolConstants } = usePracticeToolConstants();
  return (
    <HomeHeader>
      <TitleBanner
        title={toolConstants.title}
        description={toolConstants.description}
      />
    </HomeHeader>
  );
}
