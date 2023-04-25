# Capability Design

This document breaks the site into front-end capabilities. By breaking an application out into capabilities instead of features, we ensure two things. First, we won't forget to design for a major front-end concern that would later force us to provide a lackluster solution. Second, focusing on capabilities allows us to evolve and change to meet unknown future demands without the need to re-architect the site.

Capability based design requires less knowledge up front about individual features. Instead it focuses on providing solutions for more general front-end questions. A sample of these types of questions are...

- How large will the application be?
- How many teams will be contributing?
- How important is performance?
- How much front-end experience does the development team have?

This project provides Trimble Modus Elements as a web component library. Web components are framework agnostic and work in all modern browsers. The Stencil library and compiler provides an abstraction for creating web components quickly and in a consistent manner.

## Table of Contents

- [Provide Environmental Values](#provide-environmental-values)
- [Enforce Security](#enforce-security)
- [Handle Presentation](#handle-presentation)
- [Handle Business Logic](#handle-business-logic)
- [Manage State](#manage-state)
- [Provide Data Access](#provide-data-access)
- [Manage 3rd Party Libraries & Frameworks](#manage-3rd-party-libraries-&-frameworks)
- [Provide Static Assets](#provide-static-assets)
- [Make the Site Available](#make-the-site-available)
- [Create a Quality Product & Development Experience](#create-a-quality-product-&-development-experience)

## Capabilities

### Provide Environmental Values

**Configuration** N/A

**Feature Flagging** N/A

------

### Enforce Security

**Authentication** N/A

**Authorization** N/A

**Data** N/A

**3rd Party Libraries** All 3rd party libraries are retrieved via npm. The `npm audit` command will be run to discover package vulnerabilities.

**Testing** Possibly white source but likely just `npm audit` to start with.

------

### Handle Presentation

**Common Languages** Web components will be written in HTML, SASS, and TypeScript.

**Type of Site** This will be a component library made up of web components.

**SPA Frameworks** Stencil is the compiler (not SPA) for the library.

**Routing** N/A

**Web Components** The purpose of this library is to provide web components, it will not consume any external.

**Design Systems & Component Libraries** Trimble Modus Design System with Figma as the latest spec.

------

### Handle Business Logic

**Abstraction Patterns** Stencil provides a utility file pattern to abstract business logic from components.

**Encapsulation Patterns** The logic for each component will be encapsulated, meaning business logic will not leak from one component to another.

**Communication** Stencil provides a pattern for inputs and outputs that once compiled map to web component attributes, properties, and DOM events.

------

### Manage State

**Patterns** Stencil provides a built-in state management pattern called the state decorator.

**Technology** Stencil

------

### Provide Data Access

**Abstraction Patterns** Web component inputs and outputs should be primitive types that are easily mapped to. This will help consumers provide simple abstractions and even native wrappers for the web components.

**Encapsulation Patterns** Web components should only use their inputs and outputs to pass data. Otherwise data should not leak out of the component.

**Protocols** N/A

**Mocking** Mocking is only needed for testing purposes and will be done through Jest.

------

### Manage 3rd Party Libraries & Frameworks

**Patterns** for retrieving 3rd party libraries are package registry (npm or Yarn), CDN, and forking. npm is preferred for larger libraries or those needed by the IDE during development. Forking is highly discouraged as it leaves all future maintenance and security concerns on us.

*npm Packages*

- eslint
- @stencil/core
- @stencil/sass

------

### Provide Static Assets

**Patterns **for retrieving static assets are CDN or manual. Using a CDN is highly preferred for content used by multiple applications where performance and availability are the primary concern. Manually providing assets is as simple as including a file in an assets folder that the build knows to copy as is. This is a fine one off solution but shared resources should be made available in our CDN.

*CDN Resources*

-

------

### Make the Site Available

**Bundling** Rollup is the default bundler of Stencil.

**Compression** Compiled web components will be provided as minified JS. TypeScript typings will also be provided.

**SEO (Search Engine Optimization)** N/A

**Publishing** The primary method of distribution will be an npm package but a CDN is also a good idea. Published packages will follow semantic versioning rules.

------

### Create a Quality Product & Development Experience

**Documentation** The README at the project root will describe the project, tech, and all of the Modus web components. Stencil will auto generate individual component markdown documentation based on the comments in each component. This documentation can be copied and pasted into the README to provide complete library documentation.

**Enforcing Best Practices** Follow the Stencil docs. Implement ESLint and run it as part of the build.

**Maintaining Performance Standards** The QA team can enable automated Lighthouse tests and thresholds through Puppet.

**Implementing Telemetry** N/A

**Unit Testing** Jest will be used for unit testing. Follow the Stencil docs for best practices.

**End to End Testing** Jest will be used for end-to-end testing. Follow the Stencil docs for best practices.

------

[Back to Top](#capability-design)
