import { HARD_SKILLS } from "~/constants/skills"
import { date, MONTH, PRESENT } from "~/utils/date"

export type TExperience = {
  company: string
  title: string
  description: string
  skills: string[]
  from: Date
  to?: Date | typeof PRESENT
}

export type TExperienceGrouped<
  CompanyKey extends keyof TExperience = "company",
> = {
  company: string
  experiences: Omit<TExperience, CompanyKey>[]
}

export const MORAY_EXPERIENCE = {
  company: "Moray",
  title: "Frontend Software Engineer",
  description:
    "Spearheaded frontend innovation at Moray by modernizing interfaces, slashing load times by 40%, cutting costs with Docker optimizations (~96% smaller), and driving cross-functional collaboration to deliver scalable AI solutions for agriculture, while elevating team talent and code reliability through strategic leadership and performance-first practices.",
  skills: [
    HARD_SKILLS.JAVA_SCRIPT,
    HARD_SKILLS.TYPE_SCRIPT,
    HARD_SKILLS.REACT,
    HARD_SKILLS.VUE,
    HARD_SKILLS.MAPBOX,
    HARD_SKILLS.AWS,
    HARD_SKILLS.DOCKER,
    HARD_SKILLS.CI_CD,
  ],
  to: PRESENT,
  from: date(2023, MONTH.JUNE),
} as const satisfies TExperience

export const BUSER_EXPERIENCE = {
  company: "Buser Brasil",
  experiences: [
    {
      title: "Data Enginner",
      description:
        "I was part of the Data Engineering team within a horizontal Data tribe alongside Data Science and Analytics Engineering, where I developed Apache Airflow DAGs to ETL data into analysis tables, improving efficiency and accuracy for the analytics team. I also optimized SQL scripts in DBT by refining joins and aggregations, eliminating duplicates, and enhancing data integrity.",
      skills: [
        HARD_SKILLS.PYTHON,
        HARD_SKILLS.DBT,
        HARD_SKILLS.AIRFLOW,
        HARD_SKILLS.DATABRICKS,
        HARD_SKILLS.METABASE,
        HARD_SKILLS.SQL,
        HARD_SKILLS.AWS,
        HARD_SKILLS.DOCKER,
      ],
      to: date(2023, MONTH.JUNE),
      from: date(2023, MONTH.APRIL),
    },

    {
      title: "Fullstack Software Engineer",
      description:
        "I joined the team responsible for the Driver's mobile app, a hybrid application with a native shell for Flutter API access (e.g., background geolocation) and a Nuxt-based PWA handling business logic. I participated in agile ceremonies, implemented driver-focused features, refactored the CSS system for better reusability, and fixed user-impacting bugs.",
      skills: [
        HARD_SKILLS.PYTHON,
        HARD_SKILLS.JAVA_SCRIPT,
        HARD_SKILLS.DART,
        HARD_SKILLS.POSTGRES,
        HARD_SKILLS.DJANGO,
        HARD_SKILLS.FLUTTER,
        HARD_SKILLS.VUE,
        HARD_SKILLS.NUXT,
        HARD_SKILLS.DOCKER,
        HARD_SKILLS.RABBIT_MQ,
        HARD_SKILLS.CELERY,
        HARD_SKILLS.PWA,
      ],
      to: date(2023, MONTH.APRIL),
      from: date(2022, MONTH.OCTOBER),
    },

    {
      title: "Bootcamp",
      description:
        "I was one of 40 selected from 5,000 candidates for the BuserTech bootcamp, despite having minimal tech knowledge at the start. Through classes with expert instructors and lectures from Buser's tech team, I gained hands-on experience in software development ethics, self-directed learning, PostgreSQL, Python, HTML/CSS, Django, Vue, API development, and containerization with Docker and AWS EC2. These skills proved invaluable and laid the foundation for my tech career.",
      skills: [
        HARD_SKILLS.LINUX,
        HARD_SKILLS.HTML,
        HARD_SKILLS.CSS,
        HARD_SKILLS.JAVA_SCRIPT,
        HARD_SKILLS.PYTHON,
        HARD_SKILLS.DJANGO,
        HARD_SKILLS.NGINX,
        HARD_SKILLS.POSTGRES,
        HARD_SKILLS.SQL,
        HARD_SKILLS.VUE,
        HARD_SKILLS.NUXT,
        HARD_SKILLS.DOCKER,
        HARD_SKILLS.AWS,
      ],
      to: date(2022, MONTH.OCTOBER),
      from: date(2022, MONTH.APRIL),
    },
  ],
} as const satisfies TExperienceGrouped

export const EXPERIENCES = [MORAY_EXPERIENCE, BUSER_EXPERIENCE]
