# React Architect
A tool for optimizing React component creation workflow.
___

```sh
npm install -g react-architect
```

Create React Component modules with no setup.

```sh
react-architect MyReactComponent
```

The rest will be taken care of for you.

## About

React Architect is a simple CLI tool for automatic the setup process of creating React component modules. In a React ecosystem you may find yourself having to create multiple packages to fulfill the needs of your project. This tool will get the boring process out of the way. This way you can focus on the part that really needs your attention: creating an awesome React Component.

## What does it do?

React Architect is a CLI written in JavaScript, running on Node JS. Once you initialize a new project with `react-architect <ComponentName>` it will create a boilerplate project for you, which has all the necessary measures, like testing, live reload dev-server taken care of, so you can get started creating your component right away.

## Is it magic?

Sort of. In fact it isn't. It's simply taking advantage of a few great projects by smart people, like `react-storybook`, `babel`, `jest` and `enzyme`. All I've done is set these up for easy use.

The development server reloads automatically on change and will display your components in React Storybook. I've included this for many reasons, most importantly: it requires very little setup and can go a long way. It gives you a way to display events on its own console as well as 'stories' for each thing your component can do. It is great for quickly proof-testing your components by hand and also works as a demo-environment.

## Directory structure

In this project I've included a very basic directory structure that by no means has to be followed. In fact if you know what you're doing, you can change everything you wish and use this as a starting point. The directory structure looks as follows:

```sh
<my-component>
├── CHANGELOG.md
├── package.json
├── README.md
├── src
│   └── <MyComponent>.js
├── stories
│   └── index.js
├── __tests__
│    └── <MyComponent>.spec.js
└── .storybook
    └── config.js
```

2 distinct names will be used `my-component` is generated by kebab-casing `MyComponent`. This will be used as your package name and folder name. Of course those can be renamed. It is advised to use PascalCase when naming your components, like in the example above.

## Development

Make sure you read the `README.md` that will be installed at the root of your project directory as that will contain all necessary information about working on your new component.

## Todo

- [x] Dev server with Live Reload
- [ ] Flow support
- [ ] TypeScript support
- [ ] Updating scripts
- [ ] React Native support

## Contributing

Most developers get to the point where they have to create their own tools to automate tedious tasks. It is very rare that a tool can completely satisfy more than a few people without being developed with the help of others. Because of this I am happy to accept PRs, fixes, everything if it makes this tool more appealing to you. If you want to take it in another direction, fork it and hack away!
