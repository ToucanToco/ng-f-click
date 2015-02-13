# ng-f-click
> Fast response to click for Angular apps

Angular updates everything every time.
It's super-cool but can take some precious seconds.
Which is less cool because your UI seems nonreactive.

Your users wants to have a feedback now (<100ms). Not in some seconds.
Let's give them by updating just the part of the UI they need to see changing.

## How does it work?
Instead of refreshing everything after a `ng-click` (`$scope.$apply()`),
`f-click` updates first the scope of the UI element tat has been clicked
(and perform a `$digest` on it, which is basically what `apply` does on the
entire app).

Example: http://codepen.io/davinov/pen/bNLgKb

## Setup
Using [`bower`](http://bower.io):

    bower install --save ng-f-click

## Usage
1. Require the module
      angular.module('myApp', [
        // among other dependencies
        'ng-f-click'
      ])

2. Replace `ng-click` by `f-click`

3. Precise eventually the parenting level you want to update

### Parenting level
You can precise an optional `parentingLevel` attribute that will be used to
determine which scope will be digested first.

The more you request the higher is the scope's level, the slower the update will
be, but a greater part of the UI will be updated. It's yours to find the level
you need!

Typically, in a `ng-repeat` list, to update which element is selected, you want
to digest the list's scope, which the parent of the clicked element.
Therefore use `parenting-level=1`.

---
Developed in [Toucan Toco](http://toucantoco.com), the bird that loves reactive UIs.
