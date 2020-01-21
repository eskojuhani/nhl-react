import React, { Component } from 'react';

class GraphCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamekey: null,
      game: {}, //{homeTeamName: "alfa", awayTeamName: "beta"},
      home: [],
      away: [],
      canvas: null,
      cx: null,
      rect: null
    };
  }

  componentDidMount() {
    //window.addEventListener('resize', this.onResize)
    //window.dispatchEvent(new Event('resize'))
    this.updateCanvas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== this.state.game) {
      this.canvas = document.getElementById('canvas')
      this.cx = this.canvas.getContext('2d');
      this.cx.clearRect(0,0, this.canvas.width, this.canvas.height);
      this.setState({
        game: this.props.game,
        home: {},
        away: {},
      }, this.drawHeader(this.props.game));
    }
    if (this.props.home !== this.state.home) {
      this.setState({
        home: this.props.home,
      }, this.drawGraphs(this.props.home, '#ff0000', 1));
    }
    if (this.props.away !== this.state.away) {
      this.setState({
        away: this.props.away,
      }, this.drawGraphs(this.props.away, '#0000ff', 0));
    }
  }

  render() {
    return (
      <canvas id="canvas" width="800" height="400"></canvas>
    )
  }

  onResize(event) {
    console.log("GraphCanvas.onResize:", event.target.innerWidth);

    this.initCanvas(event.target.innerWidth * 0.9, event.target.innerHeight * 0.5);

    if (this.state.game && this.state.game.length) {
      this.drawHeader(this.state.game);
    }
    if (this.state.home) {
      this.drawGraphs(this.home, '#ff0000', 1);
    }
    if (this.state.away) {
      this.drawGraphs(this.away, '#0000ff', 0);
    }
  }

  updateCanvas() {
    //this.canvas = document.getElementById('canvas')
    //this.cx = this.canvas.getContext('2d');
    //this.cx.clearRect(0,0, this.canvas.width, this.canvas.height);

    this.initCanvas()
    if (this.state.game && this.state.game.length) {
      this.drawHeader(this.state.game);
    }
    if (this.state.home) {
      this.drawGraphs(this.home, '#ff0000', 1);
    }
    if (this.state.away) {
      this.drawGraphs(this.away, '#0000ff', 0);
    }
  }

  initCanvas(width = 0, height = 0) {
    console.log("GraphCanvas.initCanvas", width, height);

    if (this.canvas === undefined) {
      this.canvas = document.getElementById('canvas')
      this.cx = this.canvas.getContext('2d');
    }
    if (this.canvas === undefined)
      return

    this.cx.clearRect(0,0, this.canvas.width, this.canvas.height);

    if (width > 0) {
      if (this.canvas.width !== width)
        this.canvas.width = width;

      if (this.canvas.height !== height)
        this.canvas.height = height;
    }

    const rect = this.canvas.getBoundingClientRect();
    this.rect = rect;

    this.cx.lineWidth = 1;
    this.cx.lineCap = 'butt';
    this.cx.strokeStyle = '#000';

  }

  drawHeader(game) {
    if (game && this.cx) {
      this.cx.clearRect(0, 0, this.rect.width, this.rect.height);
      this.cx.beginPath();
      this.cx.strokeStyle = '#767676';
      this.cx.moveTo(0, this.rect.height/2);
      this.cx.lineTo(this.rect.width, this.rect.height/2);
      this.cx.stroke();

      this.cx.font = '30px serif';
      this.cx.fillStyle = '#ff0000';
      this.cx.fillText(game.homeTeamName, 10, 40);

      var textLen = this.cx.measureText(game.homeTeamName);
      this.cx.fillStyle = '#0000ff';
      this.cx.fillText(game.awayTeamName, textLen.width + 20, 40);
      this.cx.stroke();
      this.cx.font = '10px serif';
      this.cx.fillStyle = '#323232';
      this.cx.fillText("dotted: Avg  3d", 10, 56);
      this.cx.fillText("solid:  Avg 10d", 10, 70);
      this.cx.stroke();
    }
  }

  drawGraphs(data, color, isHome) {
    if (this.cx && this.rect && data) {
      var height = this.rect.height;
      var v_len = height / 100;
      var h_len = this.rect.width / (data.length + 1);

      this.drawMovingAvg(data, "gameMovingAvg3", color, true);
      this.drawMovingAvg(data, "gameMovingAvg10", color, false);
      this.drawLocation(data, isHome);

      this.cx.lineWidth = 1;
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var centerX = h_len * item.row_num;
        var centerY = height - (item.performance * v_len);
        if (item.overtime === 1) {
          this.cx.beginPath();
          this.cx.strokeStyle = color;
          this.cx.fillStyle = color;
          this.cx.fillRect(centerX - 7, centerY - 7, 14, 14);
          this.cx.fill();
          this.cx.stroke();
        }
        this.cx.beginPath();
        this.cx.strokeStyle = color;
        this.cx.fillStyle = color;
        this.cx.ellipse(centerX, centerY, 5, 5, 0, 0, Math.PI*2, false);
        this.cx.fill();
        this.cx.stroke();
        if (item.outcome === "L") {
          this.cx.beginPath();
          this.cx.strokeStyle = '#fff';
          this.cx.fillStyle = '#fff';
          this.cx.fillRect(centerX - 3, centerY - 3, 6, 6);
          this.cx.fill();
          this.cx.stroke();
        }
      }
    }
  }

  drawMovingAvg(data, column, color, isDash) {
    var height = this.rect.height;
    var v_len = height / 100;
    var h_len = this.rect.width / (data.length + 1);

    this.cx.save();
    if (isDash)
      this.cx.setLineDash([1,2]);
    else
      this.cx.setLineDash([]);

    var maxValue = 0;
    var minValue = 9999;
    var i = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i][column] > maxValue)
        maxValue = data[i][column];
      if (data[i][column] < minValue)
        minValue = data[i][column];
    }

    for (i = 1; i < data.length; i++) {
      var start = data[i-1];
      var end = data[i];
      this.cx.beginPath();
      this.cx.strokeStyle = color;

      if (start.location === 'H')
        this.cx.lineWidth = 2;
      else
        this.cx.lineWidth = 1;

      this.cx.moveTo(h_len * start.row_num, height - (start[column] * v_len));
      this.cx.lineTo(h_len * end.row_num, height - (end[column] * v_len));

      this.cx.stroke();
    }
    this.cx.restore();
  }

  daysBetween(date1, date2) {
    var from = new Date(date1);
    var to = new Date(date2);
    var timeDiff = Math.abs(from.getTime() - to.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  drawLocation(data, isHome) {
    //var height = this.rect.height;
    var y = this.rect.height - ((isHome === 1) ? 20 : 10);
    var h_len = this.rect.width / (data.length + 1);

    this.cx.save();
    this.cx.font = '10px serif';
    if (isHome) {
      this.cx.fillStyle = '#ff0000';
      this.cx.fillText("H", 2, y + 4);
    }
    else {
      this.cx.fillStyle = '#0000ff';
      this.cx.fillText("A", 2, y + 4);
    }
    this.cx.setLineDash([]);
    this.cx.lineWidth = 3;
    var i = 0
    for (i = 0; i < data.length; i++) {
      var item = data[i];
      var daysBefore = 0;
      if (i < data.length -1) {
        var prev = data[i+1];
        daysBefore = this.daysBetween(item.gameDate, prev.gameDate);
      }
      this.cx.beginPath();

      if (item.location === 'H')
        this.cx.strokeStyle = '#ff1111';
      else
        this.cx.strokeStyle = '#1111ff'

      this.cx.moveTo(h_len * item.row_num, y);
      this.cx.lineTo(h_len * item.row_num - h_len + (h_len / 3), y);
      var lineLen = (h_len * item.row_num) - (h_len * item.row_num - h_len + (h_len / 3));
      this.cx.stroke();
      if (item.outcome === "W") {
        this.cx.save();
        this.cx.beginPath();
        this.cx.strokeStyle = '#000';
        this.cx.fillStyle = '#000';
        this.cx.fillRect(h_len * item.row_num - 3, y - 3, 6, 6);
        this.cx.fill();
        this.cx.stroke();
        this.cx.restore();
      }
      if (daysBefore > 1) {
        var lineCaps = (daysBefore > 3 ? 3 : daysBefore - 1);
        var lineCap = (h_len - (h_len / 3)) / 4;
        this.cx.beginPath();
        this.cx.strokeStyle = '#000';
        this.cx.fillStyle = '#000';
        var j = 0
        for (j = 1; j <= lineCaps; j++) {
          this.cx.fillRect(h_len * item.row_num - lineLen + (lineCap * j) - 1, y - 4, 2, 8);
          this.cx.fill();
        }
        this.cx.stroke();

      }
    }
    this.cx.restore();
  }

}

export default GraphCanvas;
