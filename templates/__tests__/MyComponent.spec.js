import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { render } from 'react-dom'

import {{MyComponent}} from '../src/{{MyComponent}}'

test('<{{MyComponent}}/> crash test.', () => {
  const divRoot = document.createElement('div')

  render(<{{MyComponent}}/>, divRoot)
})

test('<{{MyComponent}}/> snapshot test.', () => {
  const component = renderer.create(
    <{{MyComponent}}/>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('<{{MyComponent}}/> accepts a prop', () => {
  let prop = 'prop'

  const component = mount(
    <{{MyComponent}} prop={prop}/>
  )

  expect(component.text()).toBe(`Hello, ${prop}!`)
})
