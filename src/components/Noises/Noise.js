import React, { Component } from 'react';
import { NoiseVolume } from "../Volume/NoiseVolume";
import { PrimaryButton } from '../Button/Button'
import Visualiser from '../Visualiser/Visualiser'
import './noise.css'

class Noise extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gain: 0,
      isOn: false,
      audioData: new Uint8Array(0)
    }
    this.tick = this.tick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.changeGain = this.changeGain.bind(this)
  }

  createNoise() {
    const out = this.props.audioCtx.destination;
    this.gain = this.props.audioCtx.createGain();
    const buffer = this.props.audioCtx.createBuffer(1, this.props.audioCtx.sampleRate * 1, this.props.audioCtx.sampleRate);
    let channelData = buffer.getChannelData(0);

    if (this.props.type === 'white') {
      for (let i = 0; i < buffer.length; i++) {
        channelData[i] = Math.random() * 2 - 1;
      }
    } else if (this.props.type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < buffer.length; i++) {
        let white = Math.random() * 2 - 1;
        channelData[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = channelData[i];
        // channelData[i] *= 20;   // (roughly) compensate gain
      }
    } else if (this.props.type === 'pink') {
      let b0, b1, b2, b3, b4, b5, b6;
      b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
      for (let i = 0; i < buffer.length; i++) {
        let white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        channelData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        // channelData[i] *= 0.7; // (roughly) compensate for gain
        b6 = white * 0.115926;
      }
    }

    this.noiseSrc = this.props.audioCtx.createBufferSource();
    this.noiseSrc.buffer = buffer;
    this.noiseSrc.loop = true;
    this.gain.gain.setValueAtTime(this.props.valueAtTime, 0);
    this.noiseSrc.connect(this.gain);
    this.gain.connect(this.analyser);
    this.analyser.connect(out);
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentDidMount() {
    this.analyser = this.props.audioCtx.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.createNoise();
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray)
    this.setState({ ...this.state, audioData: this.dataArray })
    this.rafId = requestAnimationFrame(this.tick)
  }

  handleClick() {
    if (this.state.isOn) {
      this.setState({ isOn: false });
      console.log("Deleted Noise Class")
      this.noiseSrc.stop()
    } else {
      this.setState({ isOn: true });
      console.log("Created Noise Class")
      this.createNoise();
      this.noiseSrc.start()
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId)
    this.analyser.disconnect();
    this.gain.disconnect();
    this.noiseSrc.disconnect();
  }

  changeGain(e) {
    let { value } = e.target;
    this.gain.gain.value = value;
    this.setState({ ...this.state, gain: value })
  }

  render() {
    return (
      <div className='noise'>
        <div className='visualiser'>
          <Visualiser audioData={this.state.audioData} color={this.props.color} />
        </div>
        <div className='control'>
          <NoiseVolume changeGain={this.changeGain} max={this.props.max} gain={this.state.gain} />
          <PrimaryButton bgColor={this.props.color} onClick={this.handleClick}>{this.props.name}</PrimaryButton>
        </div>
      </div>
    )
  }
}

export default Noise
