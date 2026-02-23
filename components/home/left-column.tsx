import { CourseCard } from "@/components/home/course-card";
import { ScrollView } from "react-native";
import SectionsList from "./sections-list";

export function LeftColumn() {
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <CourseCard />
      <SectionsList />
    </ScrollView>
  );
}
