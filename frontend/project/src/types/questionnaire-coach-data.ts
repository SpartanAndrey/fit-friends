export interface QuestionnaireCoachData {
  level: string;
  workoutTypes: string[];
  certificate: string;
  coachInfo: string;
  isReadyToCoach: boolean;
  fileCertificate: File | undefined;
}
