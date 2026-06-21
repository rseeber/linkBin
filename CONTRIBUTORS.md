# Contributors

Please feel free to contribute to this project. You can view a list of tasks that need doing in [ROADMAP.md](/ROADMAP.md).

If you have any questions, feel free to email River ([riverseeber12@gmail.com](mailto:riverseeber12@gmail.com)).

## Code standards

### Security

This is a web application that is eventually intended to be running on production servers exposed to the open internet, so security is an object. As a result, our API has been programmed to only do elementary tasks, leaving most of the computational work up to the client application. This way, there will be less attack surface area for hackers, and it will also reduce the amount of code we need to review for security.

Not to say client side security (such as against XSS, cookie stealing, etc) isn't important, which is why we must also spend time ensuring the client application is also hardened.

If you see any security issues, even minor ones, please feel free to submit them to us. You don't need to develop a patch in order for your disclosure to be valuable.

### Code clarity 

Please try your best to write easily readable code. No specific rules are enforced, but I need to be able to understand your code before I will accept your PR.

Some nice guidelines (not hard rules) to follow would be those in _The Zen of Python_, which can be applied to any language, not just python:

```
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

You can read this passage again at any time by running `python -m this` in a terminal.