[![Build Status](https://travis-ci.org/UziTech/jasmine2-json.png)](https://travis-ci.org/UziTech/jasmine2-json)
<!-- [![Windows Build Status](https://ci.appveyor.com/api/projects/status/hw8plj2yq94aqahq?svg=true)](https://ci.appveyor.com/project/UziTech/jasmine2-json) -->

# Jasmine 2.x Json

This is similar to [jasmine-json](https://github.com/atom/jasmine-json) except it is for Jasmine 2.x

# toEqualJson matcher

Comparing large objects with jasmine works great until you get an error, when it
dumps the entire object to the console in a completely human unreadable format.

This package adds a `toEqualJson` matcher to jasmine that will generate nice
diffs on error. It will tell you which keys differ, and why.

```coffee
# In your spec helper
require 'jasmine2-json'

# In your specs

describe "something", ->
  it "tests json", ->
    someObject =
      one: 1
      two:
        three: 5
        four: 4

    expect(someObject).toEqualJson
      one: 1
      two:
        three: 3
        four: 4
        five: 5
```

It will give you the path of the failure:

```
JSON is not equal:
two:
  actual:   has keys ["four","three"]
  expected: has keys ["five","four","three"]
```

If there are several errors, it will report all of them:

```coffee
it "tests json", ->
    someObject =
      two:
        three:
          four:
            five: 4
            six: 5
            seven: 6

    expect(someObject).toEqualJson
      two:
        three:
          four:
            five: 5
            six: 6
            seven: 7
```

Reports:

```
JSON is not equal:
two.three.four.five:
  actual:   4
  expected: 5
two.three.four.six:
  actual:   5
  expected: 6
two.three.four.seven:
  actual:   6
  expected: 7
```
