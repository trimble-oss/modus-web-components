# 🤔💡 Considerations

---

When submitting or reviewing contributions to the Modus Web Components library (MWC), it is important to keep code
quality in mind. To assist in this process, the following list presents a set of high-level considerations aimed at
maintaining code readability, flexibility, and consistency. By considering these points, we can help ensure that MWC
remains robust, consumer-friendly, and aligned with the Modus design system. This document serves as a resource that
can be revisited periodically to freshen up on our guiding principles.

## Table of Contents

- [Code Clarity and Readability](#code-clarity-and-readability)
- [Flexibility for Consumers](#flexibility-for-consumers)
- [Code Grammar and Naming Conventions](#code-grammar-and-naming-conventions)
- [Design System Consistency](#design-system-consistency)
- [MWC Consistency](#mwc-consistency)
- [Testing](#testing)
- [Documentation](#documentation)
- [Edge Cases](#edge-cases)
- [Usage of Units](#usage-of-units)
- [Accessibility](#accessibility)

### Code Clarity and Readability

- Question whether there are any sections of your code that could be difficult to understand, particularly when
  revisiting them in the future. If so, consider refactoring those areas to make it more intuitive.
- Avoid excessive element and logic pollution within the component's return statement. Consider creating child
  components or elements within the render function to enhance readability. It's a good practice to refactor complex
  code sections and separate them into smaller, more manageable components or functions.

### Flexibility for Consumers

- Avoid locking the component into a specific pattern that might limit its usefulness for consumers with diverse
  application requirements. Consider the flexibility of your new feature or code change to accommodate users with diverse
  needs while adhering to the Modus design system requirements. If you're building a feature for a specific use case,
  think about how it could be accomplished in a flexible way.
- When defining the component’s interface, think about how the component will be consumed; consider what will be needed
  for the inputs/outputs. Much like the point above, the goal here is to find a solid middle ground between simplicity
  and flexibility.
- Explore opportunities to make the component more customizable or configurable to increase its versatility.

### Code Grammar and Naming Conventions

- Ensure that the code follows proper grammar and syntax.
- Ensure that names and descriptions used align with MWC’s existing conventions, and are clear in their context.

### Design System Consistency

- Ensure that your code changes align with the guidelines and principles of the Modus design system.
- Address any UI inconsistencies or deviations from established patterns that might occur.

### MWC Consistency

- Research existing components to see how they handle similar cases to the component or feature you are building.
- Consider whether the patterns and structures you used make sense within MWC’s context.

### Testing

- Ensure that your changes have sufficient test coverage.
- Add appropriate unit and end-to-end tests to ensure the components' reliability and stability.

### Documentation

- Ensure you provide clear and comprehensive Storybook documentation alongside your code changes. This should encompass
  necessary examples of the new feature, Canvas Controls, and Canvas Actions, as well as details regarding any
  modifications made to properties, DOM events, and accessibility.

### Edge Cases

- Consider potential edge cases or exceptional scenarios that might not have been addressed prior to development or
  review. These edge cases can include unusual inputs, extreme values, or uncommon usage patterns.

### Usage of Units

- When coding spacing, sizing, and layout, prioritize using the 'rem' unit as the default approach to ensure consistency
  and scalability throughout the project.
- Only resort to using "px" when there is a specific case or requirement that necessitates it.

### Accessibility

- Evaluate whether your changes adhere to accessibility best practices.
- Verify that you've implemented appropriate ARIA attributes, keyboard interactions, and focus management.
- Consider suggestions for improving accessibility if you identify any areas for enhancement.
