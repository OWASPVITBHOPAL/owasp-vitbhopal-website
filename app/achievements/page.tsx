import AchievementCard from "@/components/achievementCard";
import { achivementsContent } from "@/Content/Achievements";
import Header from "@/components/header";
import { Container } from "@/components/container";

export default function Achievements() {
  return (
    <Container>
      <Header title="Achivements">
        Over the years we&#39;ve transformed the face of cybersecurity, therby
        therefore realise regardless thereafter unrestored underestimated
        variety of various undisputed achievments
      </Header>

      <h2 className='md:text-4xl text-3xl font-medium'>Our Achievements</h2>
      <div className='w-full border-2 my-4 border-dashed border-white/12' />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-14">
        {achivementsContent.map((achievement, index) => (
          <AchievementCard
            key={index}
            title={achievement.title}
            description={achievement.description}
            image={achievement.imgUrl}
            gradientClass={
              index % 2 === 0
                ? "bg-gradient-to-br from-orange-500 to-transparent"
                : "bg-gradient-to-br from-blue-500 to-cyan-400"
            }
          />
        ))}
      </div>
    </Container>
  );
}
