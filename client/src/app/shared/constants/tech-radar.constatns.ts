export const CATEGORIES = ['TECHNIQUES', 'PLATFORMS', 'TOOLS', 'LANGUAGES_AND_FRAMEWORKS'];
export const  RINGS = ['ADOPT', 'TRIAL', 'ASSESS', 'HOLD'];
export const ROLE_CLAIM = 'https://tech-radar.mathias-vogel.ch/roles';

export const RING_LABELS: Record<string, string> = {
  ADOPT: 'Adopt',
  TRIAL: 'Trial',
  ASSESS: 'Assess',
  HOLD: 'Hold'
};

export const CATEGORY_LABELS: Record<string, string> = {
  TECHNIQUES: 'Techniken',
  PLATFORMS: 'Plattformen',
  TOOLS: 'Werkzeuge',
  LANGUAGES_AND_FRAMEWORKS: 'Sprachen & Frameworks'
};

export enum TechFormMode {
  CREATE = 'CREATE',
  PUBLISH = 'PUBLISH',
  EDIT_INFO = 'EDIT_INFO',
  UPDATE_RING = 'UPDATE_RING'
}
