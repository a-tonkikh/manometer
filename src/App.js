import React, {Component} from 'react';
import Draggable from 'react-draggable';
import {DraggableCore} from 'react-draggable';

class App extends Component {
  constructor() {
        super()
        this.state = {
          arrow: "/arrow.png",
          background: "/background.png",
          staticDegree: "0",
          transformOrinX: "center",
          transformOrinY: "center",
          from: "0",
          to: "0",
          speed: "0",
          acceleration: "linear",
          animate: false,
          hide: false
        }
        this.getTransformOrigin = this.getTransformOrigin.bind(this)
        this.handleChahge = this.handleChahge.bind(this)
        this.animateElement = this.animateElement.bind(this)
        this.animateReset = this.animateReset.bind(this)
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)
    }

    getTransformOrigin(e) {
      e.preventDefault()
      let centerX = e.nativeEvent.offsetX
      let centerY = e.nativeEvent.offsetY
      this.setState({transformOrinX: centerX, transformOrinY: centerY})
    }

    handleChahge(event) {
      const {name, value} = event.target
      this.setState({[name]: value})
    }

    animateElement(event) {
      this.setState({animate: true});
    }

    animateReset(event) {
      this.setState({animate: false, staticDegree: "0"});
    }

    hideForm(event) {
      this.setState({hide: false});
    }

    showForm(event) {
      this.setState({hide: true});
    }

    render() {
      const arrowClass = this.state.animate ? 'arrow__img arrow--rotate' : 'arrow__img'
      const formClass = this.state.hide ? 'form form--hide' : 'form'
        return (
          <div className="wrap">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes rotate {
              from {transform: rotate(` + this.state.from + `deg);}
              to {transform: rotate(` + this.state.to + `deg);}
            }

            .arrow--rotate {
              animation-duration: ` + this.state.speed + `s;
              animation-timing-function: ` + this.state.acceleration + `;
            }

            `}}/>
            <div className="form-wrap" onMouseOut={this.showForm} onMouseOver={this.hideForm}>
              <div className={formClass}>
                <label htmlFor="background">Картинка фона</label>
                <input name="background" id="background" type="text" value={this.state.background} placeholder="Картинка фона (адрес)" onChange={this.handleChahge}/>
                <label htmlFor="arrow">Картинка стрелки</label>
                <input name="arrow" id="arrow" type="text" value={this.state.arrow} placeholder="Картинка стрелки (адрес)" onChange={this.handleChahge}/>
                <label htmlFor="staticDegree">Статичный угол</label>
                <input name="staticDegree" id="staticDegree" type="number" value={this.state.staticDegree} placeholder="Статичный угол" onChange={this.handleChahge} min="0" max="360" step="1"/>
                <label htmlFor="transformOrinX">Сдвинуть точку вращения по X (в px)</label>
                <input name="transformOrinX" id="transformOrinX" type="text" value={this.state.transformOrinX} placeholder="Сдвинуть точку вращения по X" onChange={this.handleChahge}/>
                <label htmlFor="transformOrinY">Сдвинуть точку вращения по Y (в px)</label>
                <input name="transformOrinY" id="transformOrinY" type="text" value={this.state.transformOrinY} placeholder="Сдвинуть точку вращения по Y" onChange={this.handleChahge}/>
                <label htmlFor="from">Анимация начальный угол</label>
                <input name="from" id="from" type="number" value={this.state.from} placeholder="Анимация начало" onChange={this.handleChahge} min="0" max="360" step="1"/>
                <label htmlFor="to">Анимация конечный угол</label>
                <input name="to" id="to" type="number" value={this.state.to} placeholder="Анимация конец" onChange={this.handleChahge} min="0" max="360" step="1"/>
                <label htmlFor="speed">Длительность анимации (секунды)</label>
                <input name="speed" id="speed" type="text" value={this.state.speed} placeholder="Длительность анимации" onChange={this.handleChahge}/>
                <label htmlFor="acceleration">Ускорение</label>
                <input name="acceleration" id="acceleration" type="text" value={this.state.acceleration} placeholder="Ускорение" onChange={this.handleChahge}/>
                <button onClick={this.animateElement}>Начать анимацию</button>
                <button onClick={this.animateReset}>Сбросить анимацию</button>
              </div>
            </div>
            <div className="background" style={{backgroundImage: "url(" + this.state.background + ")"}}>
              <Draggable>
                <div className="arrow">
                  <div className={arrowClass} onDoubleClick={this.getTransformOrigin} style={{transformOrigin: this.state.transformOrinX + "px " + this.state.transformOrinY + "px", transform: "rotate("+ this.state.staticDegree + "deg)"}}>
                    <img src={this.state.arrow} alt=""/>
                  </div>
                </div>
              </Draggable>
            </div>
          </div>
        )
    }
}

export default App
