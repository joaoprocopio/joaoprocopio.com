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

const MORAY_EXPERIENCE = {
  company: "moray.ai",
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
  from: date(2023, MONTH.JUNE),
  to: PRESENT,
} as const satisfies TExperience

const BUSER_EXPERIENCE = {
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
      from: date(2023, MONTH.APRIL),
      to: date(2023, MONTH.JUNE),
    },
    {
      title: "Fullstack Software Engineer",
      description:
        "I joined the team responsible for the Driver's mobile app, a hybrid application with a native shell for Flutter API access (e.g., background geolocation) and a Nuxt-based PWA handling business logic. I participated in agile ceremonies, implemented driver-focused features, refactored the CSS system for better reusability, and fixed user-impacting bugs.",
      skills: [],
      from: date(2022, MONTH.OCTOBER),
      to: date(2023, MONTH.APRIL),
    },
  ],
} as const satisfies TExperienceGrouped

export const EXPERIENCES = [MORAY_EXPERIENCE, BUSER_EXPERIENCE]
