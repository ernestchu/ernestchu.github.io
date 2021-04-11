
# Jupyter Audio Basics

## Audio Libraries

We will mainly use two libraries for audio acquisition and playback: 

### 1. librosa

[`librosa`](https://librosa.github.io/librosa/index.html) is a Python package for music and audio processing by [Brian McFee](https://bmcfee.github.io/). A large portion was ported from [Dan Ellis's Matlab audio processing examples](http://www.ee.columbia.edu/%7Edpwe/resources/matlab/).

### 2. IPython.display.Audio

[`IPython.display.Audio`](http://ipython.org/ipython-doc/stable/api/generated/IPython.display.html#IPython.display.Audio) lets you play audio directly in an IPython notebook.

## Setting audio file directory


```python
import os
audio_path = os.path.expanduser('~/FMA/fma_small/fma_small/000/')
```

## Reading Audio

Use [`librosa.load`](https://librosa.github.io/librosa/generated/librosa.core.load.html#librosa.core.load) to load an audio file into an audio array. Return both the audio array as well as the sample rate:


```python
import librosa
x, sr = librosa.load(audio_path + '000002.mp3')
```

    /home/b073040018/.local/lib/python3.6/site-packages/librosa/core/audio.py:162: UserWarning: PySoundFile failed. Trying audioread instead.
      warnings.warn("PySoundFile failed. Trying audioread instead.")


If you receive an error with `librosa.load`, you may need to [install ffmpeg](https://librosa.github.io/librosa/install.html#ffmpeg).

Display the length of the audio array and sample rate:


```python
print(x.shape)
print(sr)
```

    (660984,)
    22050


## Visualizing Audio

In order to display plots inside the Jupyter notebook, run the following commands, preferably at the top of your notebook:


```python
%matplotlib inline
import matplotlib.pyplot as plt
import librosa.display
```

Plot the audio array using [`librosa.display.waveplot`](https://librosa.github.io/librosa/generated/librosa.display.waveplot.html#librosa.display.waveplot):


```python
plt.figure(figsize=(14, 5))
librosa.display.waveplot(x, sr=sr)
```




    <matplotlib.collections.PolyCollection at 0x7f5e72303048>




![png](./output_17_1.png)


Display a spectrogram using [`librosa.display.specshow`](https://librosa.github.io/librosa/generated/librosa.display.specshow.html):


```python
X = librosa.stft(x)
Xdb = librosa.amplitude_to_db(abs(X))
plt.figure(figsize=(14, 5))
librosa.display.specshow(Xdb, sr=sr, x_axis='time', y_axis='hz')
```




    <matplotlib.collections.QuadMesh at 0x7f5e6fd68198>




![png](./output_19_1.png)


## Playing Audio

### `IPython.display.Audio`

Using [`IPython.display.Audio`](http://ipython.org/ipython-doc/2/api/generated/IPython.lib.display.html#IPython.lib.display.Audio), you can play an audio file:


```python
import IPython.display as ipd
# ipd.Audio(audio_path + '000002.mp3') # load a local WAV file
```

`Audio` can also accept a NumPy array. Let's synthesize a pure tone at 440 Hz:


```python
import numpy
sr = 22050 # sample rate
T = 2.0    # seconds
t = numpy.linspace(0, T, int(T*sr), endpoint=False) # time variable
x = 0.5*numpy.sin(2*numpy.pi*440*t)                # pure sine wave at 440 Hz
```

Listen to the audio array:


```python
# ipd.Audio(x, rate=sr) # load a NumPy array
```

## Writing Audio

[`soundfile.write`](https://pysoundfile.readthedocs.io/en/latest/) saves a NumPy array to a WAV file.


```python
import soundfile as sf
# sf.write('test.wav', x, sr, 'PCM_24')
```


```python

```
