---
title: "Hypertrophic cardiomyopathy"
summary: "What sets cardiac performance in a disease whose anatomy differs so much from one patient to the next."
order: 4
figure: "../../assets/figures/rodero2026-hcm-pipeline.jpg"
figureAlt: "A pipeline diagram: anatomical clustering of patient images, five four-chamber models, more than 2500 simulations with 46 parameters and 32 outputs, and a global sensitivity analysis on each anatomy."
figureCaption: "From anatomical clusters to five four-chamber models, more than 2500 simulations, and a global sensitivity analysis on each anatomy. From Rodero et al. (2026), Journal of Molecular and Cellular Cardiology, reused under CC BY 4.0."
works:
  - "10.1016/j.yjmcc.2026.08.002"
  - "10.5281/zenodo.21282273"
  - "10.5281/zenodo.21720234"
  - "10.5281/zenodo.21720633"
  - "10.5281/zenodo.21809470"
  - "10.5281/zenodo.21822517"
---

Hypertrophic cardiomyopathy thickens the heart muscle in patterns that vary between patients. I built five four-chamber electromechanical models, one for each of five anatomical phenotypes, and ran global sensitivity analyses on 46 parameters across 32 outputs. I repeated the analysis for 18 types of functional remodelling and for two drugs, mavacamten and aficamten.

Sensitivity profiles were preserved across the five anatomies. Within the parameter ranges examined, ventricular afterload explained the largest share of variance in haemodynamic outputs, up to 69%. Functional remodelling, more than anatomy alone, changed which parameters mattered, with the largest shifts under increased ventricular stiffness and under aficamten in obstructive physiology ([Rodero et al., 2026](https://doi.org/10.1016/j.yjmcc.2026.08.002)).

The meshes and the simulations behind the paper are on Zenodo: electrophysiology, passive inflation, the unloaded reference configuration, and the closed-loop cardiac cycle.
