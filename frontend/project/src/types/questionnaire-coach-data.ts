export interface QuestionnaireCoachData {
  level: string;
  workoutTypes: string[];
  certificates: string[];
  coachInfo: string;
  isReadyToCoach: boolean;
  fileCertificate: File | undefined;
}
