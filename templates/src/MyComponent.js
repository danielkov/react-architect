import React, { PureComponent } from 'react'

class {{MyComponent}} extends PureComponent {
  render () {
    let {
      children,
      prop,
      ...rest
    } = this.props

    return (
      <div {...rest}>Hello, {prop ? prop : 'World'}!</div>
    )
  }
}

export default {{MyComponent}}
