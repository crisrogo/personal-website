---
title: "Calibration and credibility"
summary: "Fitting models to many patients at a lower computational cost, and judging how far the result can be trusted."
order: 2
figure: "../../assets/figures/rodero2022-calibration.png"
figureAlt: "Two panels. Left, naive calibration: each patient needs three waves and 560 simulations. Right, scalable calibration: the first patient needs three waves and 560 simulations, each later patient one wave and 140 simulations."
figureCaption: "Calibrating each virtual patient from scratch (left) and reusing the simulations of earlier patients (right). From Rodero et al. (2022), Annals of Biomedical Engineering, reused under CC BY 4.0."
works:
  - "10.1007/s10439-022-03095-9"
  - "10.1073/pnas.2504067122"
  - "10.3389/fphy.2023.1306210"
  - "10.1007/s10439-025-03890-0"
  - "10.1109/tbme.2022.3163428"
---

A model of one patient's heart has parameters that cannot be measured directly, and calibrating them usually costs many simulations for every patient. I calibrated a cohort of virtual patients with Gaussian process emulators and Bayesian history matching, reusing the simulations of earlier patients for each new one. Without running any extra simulations, this found 87.41% of the non-implausible parameter combinations, and reducing the measurement uncertainty from 10% to 5% reduced the final parameter space by six orders of magnitude ([Rodero et al., 2022](https://doi.org/10.1007/s10439-022-03095-9)).

Calibration is part of a wider question: how much a model can be trusted for a given use. In a review of cardiac biomechanics models, we found no regulatory framework that clearly sets out the verification and validation requirements a model has to satisfy to be used reliably in applications ([Rodero et al., 2023](https://doi.org/10.3389/fphy.2023.1306210)). Emulators make the analyses this needs affordable. Global sensitivity analysis shows which inputs drive which outputs ([Karabelas et al., 2022](https://doi.org/10.1109/tbme.2022.3163428)), and emulators can share information across a cohort, which in two cardiac case studies reduced their computational cost by more than 50% compared with training a separate emulator for each member ([Lanyon et al., 2025](https://doi.org/10.1007/s10439-025-03890-0)). With Steven Niederer I wrote about the balance between complexity, simplicity and credibility in mathematical biology ([Rodero & Niederer, 2025](https://doi.org/10.1073/pnas.2504067122)).
