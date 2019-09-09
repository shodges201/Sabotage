import React from "react";
import PropTypes from 'prop-types';
import './Roulette.css';




class Roulette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startAngle: 0,
      spinTime: 0,
      arc: Math.PI / (7 / 2),
      redirect: false,
      options: ['WIN', 'LOSE', 'WIN', 'LOSE', 'WIN', 'LOSE', 'WIN'],
      values: [(Math.floor((Math.random() * 150) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 150) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100)],
      baseSize: 300,
      spinAngleStart: (Math.random() * 10 + 10),
      spinTimeTotal: (Math.random() * 3 + 4 * 2504) 
    }
    this.spinTimer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.spin = this.spin.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  /*
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    baseSize: PropTypes.number,
    spinAngleStart: PropTypes.number,
    spinTimeTotal: PropTypes.number,
    onComplete: PropTypes.func,
    values: PropTypes.array,
    switchMode: PropTypes.func
  };

  static defaultProps = {
    options: ['WIN', 'LOSE', 'WIN', 'LOSE', 'WIN', 'LOSE', 'WIN'],
    values: [(Math.floor((Math.random() * 150) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 150) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100)],
    baseSize: 300,
    spinAngleStart: Math.random() * 10 + 10,
    spinTimeTotal: Math.random() * 3 + 4 * 2504
  };
  */

  componentDidMount() {
    this.setState({
      values: [(Math.floor((Math.random() * 150) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 150) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100), (Math.floor((Math.random() * 15) + 1) * 100)],
      spinAngleStart: Math.random() * 10 + 10,
      spinTimeTotal: Math.random() * 3 + 4 * 2504      
    })
    this.drawRouletteWheel();
  }

  byte2Hex(n) {
    const nybHexString = '0123456789ABCDEF';
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  RGB2Color(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 128;
    const frequency = Math.PI * 2 / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }


  shuffleOptions = (ops) => {
    //gets random word from this.state.words
    // let str = options[Math.floor((Math.random() * this.state.words.length))];
    const newArr = ops.map(i => ops[Math.floor((Math.random() * ops.length))])
    return newArr;
  }

  drawRouletteWheel() {
    // const { options, baseSize, values } = this.props;
    let { startAngle, arc, baseSize, options, values } = this.state;
    const colors = ['#0000FF', '#008080', '#FF0000', '#3CB371', '#FF8C00', '#8A2BE2', '#8B0000']

    // const spinTimeout = null;
    // const spinTime = 0;
    // const spinTimeTotal = 0;

    let ctx;

    const canvas = this.refs.canvas;
    if (canvas.getContext) {
      const outsideRadius = baseSize - 10;
      const textRadius = baseSize - 60;
      const insideRadius = baseSize - 85;

      ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 600, 600);

      ctx.strokeStyle = 'rgb(47, 255, 99)';
      ctx.lineWidth = 10;
      // ctx.lineHeight = 4;

      ctx.font = '20px Helvetica, Arial';
      for (let i = 0; i < options.length; i++) {
        const angle = startAngle + i * arc;


        // ctx.fillStyle = this.getColor(i, options.length);
        ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.arc(baseSize, baseSize, outsideRadius, angle, angle + arc, false);
        ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.translate(baseSize + Math.cos(angle + arc / 2) * textRadius,
          baseSize + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = i < 7 ? `${options[i]} ${values[i]} PTS` : options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = 'rgb(47, 255, 99)';
      ctx.beginPath();
      ctx.lineTo(baseSize + 10, baseSize - (outsideRadius + 20));
      ctx.lineTo(baseSize + 0, baseSize - (outsideRadius - 5));
      ctx.lineTo(baseSize - 10, baseSize - (outsideRadius + 20));
      ctx.fill();
      ctx.stroke();
    }
  }

  spin() {
    this.spinTimer = null;
    this.setState({ spinTime: 0 }, () => this.rotate());
  }

  rotate() {
    const { spinAngleStart, spinTimeTotal, spinTime, startAngle } = this.state;
    if (spinTime > 2800) {
      clearTimeout(this.spinTimer);
      this.stopRotateWheel();
    } else {
      const spinAngle = spinAngleStart - this.easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      this.setState({
        startAngle: startAngle + spinAngle * Math.PI / 180,
        spinTime: spinTime + 30,
      }, () => {
        this.drawRouletteWheel();
        clearTimeout(this.spinTimer);
        this.spinTimer = setTimeout(() => this.rotate(), 30);
      })
    }
  }

  hitAPIRoute(index) {
    // const { values, switchMode } = this.props;
    const { values } = this.state;
    let value = 0;
    if (index % 2 == 0) {
      value = values[index];
    }
    else {
      value = values[index] * -1;
    }
    console.log(values);
    console.log(index);
    console.log(value);
    const data = {
      deduct: value
    }
    fetch("/api/score", {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      setTimeout(() => {

        this.props.goToLeaderboard()
        // switchMode(index < 4 ? false : true);
      }, 1500)
    })
  }

  stopRotateWheel() {
    let { startAngle, arc, baseSize, options, values } = this.state;
    // const { options, baseSize, values } = this.props;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 40px Helvetica, Arial';
    const text = index < 7 ? `${options[index]} ${values[index]} PTS` : options[index];
    ctx.fillText(text, baseSize - ctx.measureText(text).width / 2, baseSize);
    ctx.restore();
    this.hitAPIRoute(index);
  }

  easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  handleOnClick() {
    this.spin();
  }

  render() {
    const { baseSize } = this.state;

    return (
      <>
        <div className="roulette">
          <h1>bonus</h1>
          <span className="memo">
            click <span className="keywords">SPIN</span> to receive a random <br />point bonus or penalty
          </span>
          <div className="roulette-container">
            <canvas ref="canvas" width={baseSize * 2} height={baseSize * 2} className="roulette-canvas"></canvas>
          </div>
          <div className="roulette-container">
            <button onClick={this.handleOnClick} className="spin-btn" id="spin">spin</button>
          </div>
        </div>

        <div id="time-left" style={{ background: "indigo" }}></div>
      </>
    );
  }
}

export default Roulette;
