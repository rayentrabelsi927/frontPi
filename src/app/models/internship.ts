export class Internship {
  internshipId!: number;
  titleInternship!: string;
  companyInternship!: string;
  durationInternship!: string;
  descriptionInternship!: string;
  locationInternship!: string;
  skillsRequiredInternship!: string;
  responsibilitiesInternship!: string;
  deadlineInternship!: string; // Corrected syntax
  showDetails: boolean = false;

  constructor() {
    // Optionally initialize other properties if needed
  }
}
