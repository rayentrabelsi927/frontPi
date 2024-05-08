import { User } from "./User";

export class FreelanceJob {
  jobId!: number;
  titleJob!: string;
  clientJob!: string;
  durationJob!: string;
  locationJob!: string;
  skillsRequiredJob!: string;
  descriptionJob!: string;
  budgetJob!: number;
  deadlineJob!: string;
  users!:User;
}
