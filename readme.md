### 1. Variables: `var` vs. `let` vs. `const`

I prioritized using `const` and `let` to ensure block-scoping and prevent the "variable leaking" issues common with `var`.

- **`const`**: My default choice. Used for variables that don't need re-assignment (like components or imported modules).
- **`let`**: Used only when a value needs to change (e.g., counters or toggle states).
- **`var`**: Avoided entirely to maintain modern standards and predictable scoping.

### 2. The Spread Operator (`...`)

The spread operator made state management much easier. I used it to:

- **Copy Arrays/Objects**: Quickly creating shallow copies without mutating the original data.
- **Merging**: Combining multiple data objects into a single one for cleaner props handling.

### 3. Array Methods: `map()`, `filter()`, & `forEach()`

To handle data dynamically, I moved away from traditional `for` loops in favor of these functional methods:

- **`.map()`**: Essential for transforming data (e.g., turning an array of strings into a list of UI components).
- **`.filter()`**: Used to "weed out" unwanted data based on specific conditions.
- **`.forEach()`**: Used when I simply needed to execute a function for every item without creating a new array.

### 4. Arrow Functions

Arrow functions (`=>`) helped keep the code concise.

- **Cleaner Syntax**: Removed the need for the `function` keyword and curly braces for one-liners.
- **Scoping**: They don't create their own `this` context, which is incredibly helpful when working with event listeners or classes.

### 5. Template Literals

Instead of messy string concatenation with `+` signs, I used backticks (`` ` ``) and `${}` syntax.

- **Readability**: Makes it easy to see exactly what the final string will look like.
- **Multi-line**: Allowed for cleaner multi-line strings without needing `\n` characters.

---
