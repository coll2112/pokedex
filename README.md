## The Gray Plate - A Next.js Boilerplate

The Gray Plate makes it easy to spin up a new project in just a few seconds. It utilizes typescript, jest, and a simple architecture help you create your next best project! The boilerplate also provides out of the box support for typescript absolute paths, with a few already predefined. This boilerplate also has eslint and prettier rules setup from the start.

### File Structure and Project Architecture

Below is the basic file structure for the boilerplate.

- src
  - components - _the components go here_
    - component
      - tests
  - layout - _where the main layout for the entire project goes_
  - pages - _all the Next.js pages live here_
    - api - _this is where the api routes go_
  - styles - _global and main live here_
    - base - _this is where you'd put your reset stylesheet_
    - utils - _variables, mixins, and functions files stay here_

#### Global Styles - One Simple Import

Some projects only utilize one SCSS file because that's all they need, but there are times where you'll need mixins, functions, or a whole new file just for you color variables. The solution for this is that each file under the util folder is specifically for mixins, variables, or functions. Inside of the __styles__ folder is a __global.scss__ file which houses all the utils and __@forwards__ them. With the way _tspaths_ are configured, you're able to import __global.scss__ into your styles file exposing all the mixins, variables, and functions with one simple import.

#### Typescript Paths

Typescript can be setup for your project to use absolute paths. What this means is that instead of importing a file from __"../../../utils/**"__ you can customize a much more simple path such as __"~/utils/**"__.
