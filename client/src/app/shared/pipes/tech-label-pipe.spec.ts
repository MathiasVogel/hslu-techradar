import { describe, it, expect, beforeEach } from 'vitest';
import { TechLabelPipe } from './tech-label-pipe';

describe('TechLabelPipe', () => {
  let pipe: TechLabelPipe;

  beforeEach(() => {
    pipe = new TechLabelPipe();
  });

  it('Gibt leeren Text zurück, wenn kein Wert vorhanden ist', () => {
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('wandelt Ring-Enum in lesbare Bezeichnungen um', () => {
    expect(pipe.transform('ADOPT')).toBe('Adopt');
    expect(pipe.transform('TRIAL')).toBe('Trial');
    expect(pipe.transform('ASSESS')).toBe('Assess');
    expect(pipe.transform('HOLD')).toBe('Hold');
  });

  it('wandelt Kategorie-Enum in lesbare Bezeichnungen um', () => {
    expect(pipe.transform('TECHNIQUES')).toBe('Techniken');
    expect(pipe.transform('LANGUAGES_AND_FRAMEWORKS')).toBe('Sprachen & Frameworks');
    expect(pipe.transform('PLATFORMS')).toBe('Plattformen');
    expect(pipe.transform('TOOLS')).toBe('Werkzeuge');
  });
});
