/**
 * The factual record behind the CV page. Every line comes from the public
 * ORCID record (0000-0001-7921-7840), except the two `note` texts, which come
 * from the CEMRG biography and the King's thesis record. Dates are shown as
 * years only, although ORCID holds months for most entries.
 */

export interface CvLine {
	years: string;
	title: string;
	place: string;
	note?: string;
}

export const POSITIONS: CvLine[] = [
	{ years: '2023 to now', title: 'Research Associate', place: 'National Heart and Lung Institute, Imperial College London' },
	{ years: '2022 to 2023', title: 'Research Associate', place: "School of Biomedical Engineering and Imaging Sciences, King's College London" },
	{ years: '2022', title: 'Research Assistant', place: "School of Biomedical Engineering and Imaging Sciences, King's College London" },
	{ years: '2017 to 2022', title: 'Research Worker', place: "Department of Biomedical Engineering, King's College London" },
	{ years: '2017', title: 'Senior Research Technician', place: 'Institute for Molecular Imaging Technologies, Universitat Politècnica de València' },
	{ years: '2017', title: 'Research Intern', place: 'FACSA' },
	{ years: '2016', title: 'Intern', place: 'Innovative Solutions & 3D Engineering' },
	{ years: '2015 to 2016', title: 'Intern', place: 'Department of Biochemistry and Molecular Biology, Universitat de València' },
];

export const EDUCATION: CvLine[] = [
	{
		years: '2018 to 2022',
		title: 'PhD in Biomedical Engineering',
		place: "King's College London",
		note: 'Supervised by Steven Niederer and Pablo Lamata.',
	},
	{ years: '2017', title: 'Pre-doctoral fellow', place: 'Institute of Robotics and Information Technology, Universitat de València' },
	{ years: '2016 to 2017', title: 'MSc in Computational Mathematics', place: 'Universitat Jaume I' },
	{
		years: '2016 to 2017',
		title: 'MSc in Mathematical Research',
		place: 'Universitat de València',
		note: 'Awarded jointly with the Universitat Politècnica de València.',
	},
	{ years: '2012 to 2016', title: "Bachelor's degree in Mathematics", place: 'Universitat de València' },
];

export const FUNDING: CvLine[] = [
	{ years: '2017 to 2022', title: 'Personalised In-Silico Cardiology', place: 'European Commission' },
];

export const REVIEWING: string[] = ['Journal of Visualized Experiments'];
