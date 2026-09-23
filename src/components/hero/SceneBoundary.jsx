import { Component } from 'react';

// Se o WebGL falhar (driver, contexto perdido, GPU bloqueada), o hero perde
// só o pano de fundo decorativo — o texto continua intacto.
export default class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
