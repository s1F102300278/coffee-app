import type { DiagnosisResult, UserAnswers } from "../logic/diagnosisEngine";

export type SavedDiagnosis = {
  id: string;
  createdAt: string;
  result: DiagnosisResult;
  answers: UserAnswers;
};

const KEY_PROFILE = "coffee_profile_diagnoses";
const KEY_LAST = "coffee_last_diagnosis";

export function loadProfileDiagnoses(): SavedDiagnosis[] {
  try {
    return JSON.parse(localStorage.getItem(KEY_PROFILE) ?? "[]");
  } catch {
    return [];
  }
}

export function addProfileDiagnosis(entry: SavedDiagnosis) {
  const cur = loadProfileDiagnoses();
  localStorage.setItem(KEY_PROFILE, JSON.stringify([entry, ...cur]));
}

export function loadLastDiagnosis(): SavedDiagnosis | null {
  try {
    return JSON.parse(localStorage.getItem(KEY_LAST) ?? "null");
  } catch {
    return null;
  }
}

export function saveLastDiagnosis(entry: SavedDiagnosis) {
  localStorage.setItem(KEY_LAST, JSON.stringify(entry));
}
