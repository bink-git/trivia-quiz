import { SectionHeading } from '../ui/section-heading';
import { MotionDiv } from '../ui/motion-div';

interface Skill {
  name: string;
  level: number;
}

const frontendSkills: Skill[] = [
  { name: 'React', level: 80 },
  { name: 'TypeScript', level: 30 },
  { name: 'JavaScript', level: 80 },
  { name: 'HTML/CSS', level: 90 },
  { name: 'Tailwind CSS', level: 85 },
];

export function About() {
  return (
    <section id="about" className="section bg-secondary/50">
      <div className="container">
        <SectionHeading
          subtitle="About Me"
          title="Get to know me better"
          description="I'm a passionate frontend developer with expertise in building responsive and performant web applications using modern technologies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MotionDiv animation="slide-up">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">My Background</h3>
              <p className="text-muted-foreground">
                With over 2 years of experience in web development, I specialize
                in building modern, interactive user interfaces using React. I
                have a strong foundation in frontend technologies and a keen eye
                for design and user experience.
              </p>
              <p className="text-muted-foreground">
                I'm passionate about creating clean, maintainable code and
                continuously learning new technologies to stay at the forefront
                of web development. My approach combines technical expertise
                with creative problem-solving to deliver exceptional digital
                experiences.
              </p>
            </div>
          </MotionDiv>

          <div className="space-y-8">
            <MotionDiv animation="slide-up" delay={200}>
              <h3 className="text-2xl font-medium mb-4">Frontend Skills</h3>
              <div className="space-y-4">
                {frontendSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          transitionDelay: `${index * 100}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
