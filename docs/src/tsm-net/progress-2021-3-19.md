# Progress 2021-3-19
## DLHLP

- Voice Conversion
- Feature Disentangle
- CycleGAN and StarGAN

## Paper
### Voice Conversion via feature disentangle

- [Multi-target Voice Conversion without Parallel Data by Adversarially Learning Disentangled Audio Representations](https://arxiv.org/abs/1804.02812)
- [One-shot Voice Conversion by Separating Speaker and Content Representations with Instance Normalization](https://arxiv.org/abs/1904.05742)
- [Unsupervised End-to-End Learning of Discrete Linguistic Units for Voice Conversion](https://arxiv.org/abs/1905.11563)

### HPSS
- [Adversarial Unsupervised Domain Adaptation for Harmonic-Percussive Source Separation](https://arxiv.org/abs/2101.00701)
- [Musical Source Separation](https://infoscience.epfl.ch/record/279389?ln=en)

## Architecture
![architecture](./assets/images/progress-2021-3-19/architecture.jpeg)
In this unsupervised model, we want the **content encoder** to be independent of the beat rate information. After the traning completed, we can modified the bpm condition or apply two-stage training.
### Question
How to design a variable-length output layer?
