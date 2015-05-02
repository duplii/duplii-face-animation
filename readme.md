# Duplii Face Animation

This animation will be used on the public website and it basically makes duplii faces pour down, like rain or snow. It also creates a slight parallax effect with bigger and darker faces moving more quickly than smaller and more transparent ones. Sweet as it gets.

It is based on the world-famous [Duplii Bubble Animation™](https://github.com/duplii/duplii-bubble).

This final version creates a span tag that contains an img tag. This is so I can set the img opacity separately from the animatated span opacity. Unfortunately, this means that this version does not allow to set the color dinamically, because it can't be done when using img tag.

I am also including two different branches that use the `object` tag and `<use xlink:href>`. Both presented issues that lead me to abandon them. The `object` version created huge performance issues, probably related to memory leaks in some extensions like LastPass. The `use` version, instead, had issues with viewbox. It basically didn't size svgs correctly.

I am also including the `config.codekit` file so that everyone using Codekit will be able to get started immediately.

## Live demo

A live demo of this project can be found at [here](http://duplii.github.io/duplii-face-animation/ "Duplii | We Make Duplication Happen").

<img src="http://duplii.github.io/duplii-face-animation/public/screenshot.png" width="856" height="347" alt="Duplii | Face Animation Preview" />

## MIT License

Copyright (c) 2015 Making Duplication Technologies ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

