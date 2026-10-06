/**
 * Public code, curated by hand. Only public repositories belong here.
 * `paper` is a DOI from publications.json, linking the code to its paper.
 */

export interface CodeEntry {
	name: string;
	url: string;
	description: string;
	paper?: string;
	kind: 'paper' | 'teaching' | 'art';
}

export const CODE: CodeEntry[] = [
	{
		name: 'meshes-cohort',
		url: 'https://github.com/crisrogo/meshes-cohort',
		description: 'The pipeline that builds the four-chamber meshes and the statistical shape model, and the analysis of their simulated function.',
		paper: '10.1371/journal.pcbi.1008851',
		kind: 'paper',
	},
	{
		name: 'MPP',
		url: 'https://github.com/crisrogo/MPP',
		description: 'Simulations of multipoint pacing with virtual quadripolar leads.',
		paper: '10.1016/j.compbiomed.2021.105073',
		kind: 'paper',
	},
	{
		name: 'Rodero2022_ABME',
		url: 'https://github.com/crisrogo/Rodero2022_ABME',
		description: 'Emulators and Bayesian history matching for calibrating a cohort of virtual patients.',
		paper: '10.1007/s10439-022-03095-9',
		kind: 'paper',
	},
	{
		name: 'ISCTs_review',
		url: 'https://github.com/crisrogo/ISCTs_review',
		description: 'The notebook that draws the figures of the systematic review of cardiac in-silico trials.',
		paper: '10.1088/2516-1091/acdc71',
		kind: 'paper',
	},
	{
		name: 'sobol-gsa-frames',
		url: 'https://github.com/crisrogo/sobol-gsa-frames',
		description: 'Sobol global sensitivity analysis explained one idea per frame, as 2-D plots to drop into slides.',
		kind: 'teaching',
	},
	{
		name: 'cardiac-blender-art',
		url: 'https://github.com/crisrogo/cardiac-blender-art',
		description: 'Blender scripts that render simulation meshes as glass hearts, with a tutorial.',
		kind: 'art',
	},
];
