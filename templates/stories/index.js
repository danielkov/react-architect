import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import {{MyComponent}} from '../src/{{MyComponent}}'

const prop = '{{MyComponent}}'

storiesOf('Button', module)
  .add('without props', () => (
    <{{MyComponent}}/>
  ))
  .add('with prop', () => (
    <{{MyComponent}} prop={prop}/>
  ))
  .add('with action listener', () => (
    <{{MyComponent}} onClick={action('clicked')}/>
  ))
