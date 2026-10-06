---
title: "Heart shape and function"
summary: "Which differences in anatomy change how a heart works, and which ones a model can leave out."
order: 1
figure: "../../assets/figures/rodero2021-ct-cohort.jpg"
figureAlt: "Twenty four-chamber heart meshes in a grid of four rows, numbered 1 to 20, each a slightly different shape."
figureCaption: "Four-chamber meshes built from the CT scans of 20 people in whom no heart condition was found. From Rodero et al. (2021), PLoS Computational Biology, reused under CC BY 4.0."
works:
  - "10.1371/journal.pcbi.1008851"
  - "10.1016/j.compbiomed.2021.105073"
  - "10.1371/journal.pcbi.1014325"
  - "10.1007/978-1-0716-3527-8_7"
  - "10.5281/zenodo.4590293"
  - "10.5281/zenodo.4506929"
  - "10.5281/zenodo.4593738"
  - "10.5281/zenodo.19351401"
---

Heart models are usually built on one anatomy, or on a few. During my PhD I built four-chamber meshes from the CT scans of 20 people in whom no heart condition was found, made a statistical shape model from 19 of them, and simulated their electromechanics, which completed for 18 of the 20 hearts. Nine shape modes captured 90% of the anatomical variation, but the modes that explained most of the anatomy did not explain an equal share of the simulated function. Representing a patient's anatomy with only a few modes can therefore lose accuracy in the simulated function ([Rodero et al., 2021](https://doi.org/10.1371/journal.pcbi.1008851)).

Anatomy also matters for devices. I simulated pacing from every combination of one and two electrodes along a quadripolar lead, in 24 heart failure anatomies and 20 simulated reverse-remodelled ones. Patient anatomy was the main determinant of the reduction in activation time, and a single lead design optimised for the whole population came close to a personalised design in most patients ([Rodero et al., 2021](https://doi.org/10.1016/j.compbiomed.2021.105073)).

The meshes, a cohort of 1000 synthetic hearts drawn from the shape model, and its extreme and average shapes are on Zenodo for others to use. With colleagues I have since contributed to a public cohort of 50 four-chamber models, 25 male and 25 female, in heart failure and control cases ([Solís-Lemus et al., 2026](https://doi.org/10.1371/journal.pcbi.1014325)).
